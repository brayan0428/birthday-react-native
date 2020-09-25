import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Birthday({birthday,deleteBirthday}) {
  const past = birthday.days > 0 ? true : false;

  const dayBirthday = () => {
    if(birthday.days == 0){
        return <Text style={{color: 'white'}}>¡El cumpleaños es hoy!</Text>
    }else{
        const days = -birthday.days
        return (
            <View style={styles.viewDay}>
                <Text>{days}</Text>
                {
                    days == 1 ? <Text>Dia</Text> : <Text>Dias</Text>
                }
            </View>
        )
    }
  }

  return (
    <TouchableOpacity
      onPress={() => deleteBirthday(birthday)}
      style={[
        styles.container,
        past ? styles.past : birthday.days == 0 ? styles.current : styles.next,
      ]}>
      <Text style={styles.textFullName}>
        {birthday.name} {birthday.lastName}
      </Text>
      {
          past ? <Text style={{color: 'white'}}>Pasado</Text> : dayBirthday()
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
  past: {
    backgroundColor: '#D50F0F',
  },
  next: {
    backgroundColor: '#0F5DD5',
  },
  current: {
    backgroundColor: "#0FCF3A"
  },
  textFullName: {
    color: 'white',
    fontSize: 16,
  },
  viewDay: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      borderRadius: 20
  }
});
