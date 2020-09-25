import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { validateEmail } from '../utils/validations'
import firebase from '../utils/firebase'
import 'firebase/auth'

export default function RegisterForm({changeForm}) {
    const [formData, setFormData] = useState(defaultValues())
    const [errors, setErrors] = useState({})

    const register = () => {
        const {email,password,repeatPassword} = formData
        let errors = {}
        if(!email || !password || !repeatPassword){
            if (!email) errors.email = true
            if (!password) errors.password = true
            if (!repeatPassword) errors.repeatPassword = true 
        }else if(!validateEmail(email)){
            errors.email = true
        }else if(password !== repeatPassword){
            errors.password = true
            errors.repeatPassword = true 
        }else if(password.length < 6){
            errors.password = true
            errors.repeatPassword = true 
        }else{
            firebase.auth()
                .createUserWithEmailAndPassword(email,password)
                .then(() => {})
                .catch((error) => {
                    console.log(error)
                    setErrors({
                        email: true,
                        password: true,
                        repeatPassword: true
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
                style={[styles.input, errors.email && styles.errorInput]}
                onChange={e => setFormData({...formData, email: e.nativeEvent.text})}
            />
            <TextInput 
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input,errors.password && styles.errorInput]}
                secureTextEntry={true}
                onChange={e => setFormData({...formData, password: e.nativeEvent.text})}
            />
            <TextInput 
                placeholder="Confirmar contraseña"
                placeholderTextColor="#969696"
                style={[styles.input,errors.repeatPassword && styles.errorInput]}
                secureTextEntry={true}
                onChange={e => setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            />
            <TouchableOpacity onPress={register} style={styles.registerButton}>
                <Text style={styles.btnText}>Registrarme</Text>
            </TouchableOpacity>
            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValues(){
    return {
        email: "",
        password: "",
        repeatPassword: ""
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
    registerButton: {
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20
    },
    errorInput:{
        borderColor: 'red'
    }
})
