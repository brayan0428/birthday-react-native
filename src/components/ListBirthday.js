import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import ActionBar from './ActionBar'
import AddBirthday from './AddBirthday'
import firebase from '../utils/firebase'
import 'firebase/firestore'
import moment from 'moment'
import Birthday from './Birthday'

firebase.firestore().settings({experimentalForceLongPolling:true})
const db = firebase.firestore(firebase)

export default function ListBirthday({user}) {
    const [showList, setShowList] = useState(true)
    const [birthdays, setBirthdays] = useState([])
    const [pastBirhtdays, setPastBirthdays] = useState([])
    const [reloadData, setReloadData] = useState(false)

    useEffect(() => {
        db.collection(user.uid)
            .orderBy("dateBirth", "asc")
            .get()
            .then(birthdays => {
                let items = []
                birthdays.forEach(b => {
                    const data = b.data()
                    data.id = b.id
                    items.push(data)
                })
                formatData(items)
                setReloadData(false)
            }).catch(console.log)
    }, [reloadData])

    const formatData = (data) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })
        
        const birthdaysTmp = []
        const pastBirthdaysTmp = []

        data.forEach(d => {
            const dateBirth = new Date(d.dateBirth.seconds * 1000)
            const dateBirthday = moment(dateBirth).set({year: currentDate.get('year')})
            const diffDate = currentDate.diff(dateBirthday, "days")

            const itemTemp = d
            d.dateBirth = dateBirthday
            d.days = diffDate

            if(diffDate <= 0){
                birthdaysTmp.push(itemTemp)
            }else{
                pastBirthdaysTmp.push(itemTemp)
            }
        })
        setBirthdays(birthdaysTmp)
        setPastBirthdays(pastBirthdaysTmp)
    }

    const deleteBirthday = (birthday) => {
        Alert.alert(
          "Eliminar cumpleaños",
          `¿Esta seguro que desea eliminar el cumpleaños de ${birthday.name} ${birthday.lastName}?`,
          [
            {
              text: "Cancelar",
              style:"cancel"
            },
            {
              text: "Eliminar",
              style:"destructive",
              onPress : () => {
                db.collection(user.uid)
                  .doc(birthday.id)
                  .delete()
                  .then(() => setReloadData(true))
              }
            }
          ],
          {cancelable: false}
        )
      }

    return (
        <View style={styles.container}>
            {
                showList ? (
                    <ScrollView style={styles.scrollView}>
                        {
                            birthdays.map(b => <Birthday key={b.id} birthday={b} deleteBirthday={deleteBirthday}/>)
                        }
                        {
                            pastBirhtdays.map(b => <Birthday key={b.id} birthday={b} deleteBirthday={deleteBirthday}/>)
                        }
                    </ScrollView>
                ) : (
                    <AddBirthday user={user} setShowList={setShowList} setReloadData={setReloadData} deleteBirthday={deleteBirthday}/>
                )
            }
            <ActionBar showList={showList} setShowList={setShowList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    scrollView: {
        width: "100%",
        marginBottom: 50
    }
})
