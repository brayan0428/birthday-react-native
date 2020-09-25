import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../utils/firebase'
import 'firebase/firestore'
firebase.firestore().settings({experimentalForceLongPolling:true})
const db = firebase.firestore(firebase)

export default function AddBirthday({user,setShowList,setReloadData}) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
    setIsDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const submit = () => {
    const {name, lastName, dateBirth} = formData;
    let errors = {};
    if (!name || !lastName || !dateBirth) {
      if (!name) errors.name = true;
      if (!lastName) errors.lastName = true;
      if (!dateBirth) errors.dateBirth = true;
    } else {
      const data = {...formData}
      data.dateBirth.setYear(0)
      db.collection(user.uid)
        .add(data)
        .then(() => {
          setReloadData(true)
          setShowList(true)
        })
        .catch(error => {
          console.log(error)
          setErrors({
            name: true,
            lastName: true,
            dateBirth: true
          })
        })
    }
    setErrors(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, errors.name && styles.error]}
          placeholder="Nombres"
          placeholderTextColor="#969696"
          onChange={(e) => handleChange(e, 'name')}
        />
        <TextInput
          style={[styles.input, errors.lastName && styles.error]}
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          onChange={(e) => handleChange(e, 'lastName')}
        />
        <View
          style={[
            styles.input,
            styles.viewDate,
            errors.dateBirth && styles.error,
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('DD/MM/yyyy')
              : 'Fecha de cumpleaños'}
          </Text>
        </View>
        <TouchableOpacity onPress={submit} style={styles.submitButton}>
          <Text style={styles.btnText}>Guardar cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#ffff',
    width: '80%',
    marginBottom: 15,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    fontSize: 18,
  },
  viewDate: {
    justifyContent: 'center',
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    borderColor: 'red',
  },
});
