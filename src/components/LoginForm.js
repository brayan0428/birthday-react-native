import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { validateEmail } from '../utils/validations'
import firebase from '../utils/firebase'
import 'firebase/auth'

export default function LoginForm({changeForm}) {
    const [formData, setFormData] = useState(defaultValues())
    const [errors, setErrors] = useState({})

    const login = () => {
        const {email, password} = formData
        let errors = {}
        if(!email || !password){
            if(!email) errors.email = true
            if(!password) errors.password = true
        }else if (!validateEmail(email)){
            errors.email = true
        }else{
            firebase.auth()
                .signInWithEmailAndPassword(email,password)
                .then(() => {})
                .catch(error => {
                    console.log(error)
                    setErrors({
                        email: true,
                        password: true
                    })
                })
        }

        setErrors(errors)
    }
    return (
        <>
             <TextInput 
                placeholder="Email"
                placeholderTextColor="#969696"
                style={[styles.input,errors.email && styles.errorInput]}
                onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
            />
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input,errors.password && styles.errorInput]}
                secureTextEntry={true}
                onChange={e => setFormData({...formData, password: e.nativeEvent.text})}
            />
            <TouchableOpacity onPressIn={login} style={styles.loginButton}>
                <Text style={styles.btnText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPressIn={changeForm}>
                    <Text style={styles.btnText}>Registrarme</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValues(){
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18
    },
    input:{
        height: 50,
        color: "#ffff",
        width:"80%",
        marginBottom: 15,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        borderWidth: 1
    },
    loginButton: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    register: {
        flex:1,
        justifyContent: "flex-end",
        marginBottom: 20
    },
    errorInput: {
        borderColor: 'red'
    }
})
