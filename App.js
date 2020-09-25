import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native'
import firebase from './src/utils/firebase'
import 'firebase/auth'
import Auth from './src/components/Auth'
import ListBirthday from './src/components/ListBirthday'

LogBox.ignoreLogs(["Setting a timer for a long period of time"])

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setUser(user))
  }, [])
  
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={styles.background}>
          {user ? <ListBirthday user={user}/>: <Auth />}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height: "100%"
  }
})

