import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from '../utils/firebase'
import 'firebase/auth'

export default function ActionBar({showList,setShowList}) {

    const logout = () => {
        firebase.auth().signOut()
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewLogout}>
                <Text style={styles.text} onPress={logout}>Cerrar Sesión</Text>
            </View>
            <View style={styles.viewAdd}>
                <Text style={styles.text} onPress={() => setShowList(!showList)}>
                    {
                        showList ? 'Nuevo cumpleaños' : 'Cancelar nuevo'
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 50,
        flexDirection: "row",  
        paddingHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    viewLogout: {
        backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 50,
        marginRight: 5
    },
    viewAdd: {
        backgroundColor: "#0AABD6",
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 50
    },
    text: {
        color: 'white',
        fontSize: 16
    }
})
