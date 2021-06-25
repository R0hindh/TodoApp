import React from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'



const InputText = (props) => {
    return (
        <View style={styles.input}>
        <TextInput
          placeholder={props.placeholder}
          value={props.value}
          style={styles.font}
          onSubmitEditing={props.onSubmitEditing}
          onChangeText={props.onChangeText}
        />
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    input: {
    width: "80%",
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    
    elevation: 5,
  },
  font:{
    fontSize:18,
    flex:1,
  }
})
