import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Task = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onCompleted}>
          <View style={styles.square}>
            {props.status ? (
              <MaterialIcons name="done" size={24} color="black" />
            ) : (
              <Text></Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={props.status ? styles.itemDoneText : styles.itemText}>
          {props.text}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <View style={styles.circular}></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 20,
    marginBottom:20,
    borderRadius: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#3e64ff",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemDoneText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontSize: 18,
  },
  itemText:{
    fontSize: 18,
  },
  circular: {
    width: 24,
    height: 24,
    backgroundColor: "red",
    opacity: 0.4,
    borderColor: "red",
    borderRadius: 5,
  },
});
export default Task;
