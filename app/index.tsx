import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import iconImage from "@/assets/images/user-icon.png";
import { todoData, ToDoType } from "@/constants/list_data";

export default function Index() {
  const [todos, setTodos] = useState<ToDoType[]>(todoData);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const ToDoItem = ({ todo }: { todo: ToDoType }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoStatus}>
        {todo.isDone ? (
          <Feather name="check-circle" size={24} color="black" />
        ) : (
          <Feather name="circle" size={24} color="black" />
        )}
      </Text>
      <Text
        style={[
          styles.todoTitle,
          todo.isDone && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      <TouchableOpacity
        onPress={() => {
          alert(`Delete ${todo.title}`);
        }}
      >
        <Feather name="delete" size={24} color="black" />
      </TouchableOpacity>
      {/* <Ionicons name="pencil-sharp" size={24} color="black" /> */}
    </View>
  );

  // const searchFunction = (query: string) => {
  //   const filteredTodos = todos.filter(todo) =>todo.title.toLower
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            alert("clicked!");
          }}
          activeOpacity={0} //default is .2 which reduces by 80%
        >
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={iconImage}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderColor: "white",
              borderWidth: 0,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="search"
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <ToDoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.footer}
      >
        <TextInput
          placeholder="Add to do item"
          style={styles.newToDoInput}
          clearButtonMode="always"
        />
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
          <Ionicons name="add" size={32} color="black" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  todoItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#6200ee", // purple accent
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: "#555",
  },
  todoStatus: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newToDoInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
  },

  addButton: {
    backgroundColor: "#6200ee",
    padding: 8,
    borderRadius: 10,
    marginLeft: 10,
  },
});
