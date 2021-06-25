import React, { useState,useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Task from "./Components/Task";
import { MaterialIcons } from "@expo/vector-icons";
import InputText from "./Components/InputText";
import Shadow from "./Components/Shadow";
import { AsyncStorage } from "react-native";

const storeData = async (ArrayObject) => {
  try {
    await AsyncStorage.setItem("data", JSON.stringify(ArrayObject));
  } catch (error) {
    console.log(error);
  }
};

const retrieveData = async (setTaskItems) => {
  try {
    const data = await AsyncStorage.getItem("data");
    if (data !== null) {
      setTaskItems(JSON.parse(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  if (firstLoad) {
    retrieveData(setTaskItems);
    setFirstLoad(false);
  }

  useEffect(() => {
    storeData(taskItems)
  }, [taskItems])

  const addTask = () => {
    if (task === null) {
      Alert.alert("Alert !", "Input field is empty", [
        { text: "ok", style: "destructive" },
      ]);
      return;
    }
    setTaskItems([...taskItems, { value: task, status: false }]);
    setTask(null);
    
  };
  const deleteTask = (index) => {
    let temp = taskItems.filter((item, id) => {
      if (index !== id) {
        return true;
      }
    });
    setTaskItems(temp);
  };
  const completeTaskHandler = (index) => {
    const objects = taskItems.map((item, id) => {
      if (index === id) {
        const updatedTask = {
          ...item,
          status: !item.status,
        };
        return updatedTask;
      }
      return item;
    });
    setTaskItems(objects);
  };

  const renderTaskList = (item, index) => {
    return (
      <Task
        key={index}
        text={item.value}
        status={item.status}
        onCompleted={completeTaskHandler.bind(this, index)}
        onDelete={deleteTask.bind(this, index)}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={{ ...styles.sectionTitle, ...Shadow.shadow }}>
            TODO List
          </Text>
          <View style={styles.items}>
            <ScrollView style={{}}>
              {taskItems.map((item, index) => {
                return renderTaskList(item, index);
              })}
            </ScrollView>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <InputText
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
            onSubmitEditing={() => addTask()}
          />
          <TouchableOpacity onPress={() => addTask()}>
            <View style={{ ...styles.addWrapper, ...Shadow.shadow }}>
              <Text style={styles.addText}>
                <MaterialIcons name="add" size={24} color="black" />
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01A7FF",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
    maxHeight: "80%",
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#fff",
    shadowColor: "black",
    marginHorizontal: 100,
    padding: 10,
    marginVertical: 10,
    borderRadius: 12,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  addText: {},
});
