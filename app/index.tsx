import { useEffect, useState } from "react";
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
  // const router = useRouter();
  // To add button back in, move this to the return statement
  //   <Button
  //   title="Go to Test Screen"
  //   onPress={() => router.push("/test")} // Navigate to the Test screen
  // />

  const [todos, setTodos] = useState<ToDoType[]>(todoData);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    //console.log(`todos Array:`, JSON.stringify(todos));
    //console.log(`todoText Array:`, JSON.stringify(todoText));
  }, []);

  // ToDoItem is the flat list (renderitem) component
  const ToDoItem = ({ todo }: { todo: ToDoType }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => {
          setIsDone(!isDone);
          console.log("isDone State", JSON.stringify(isDone));
        }}
      >
        <Text style={styles.todoStatus}>
          {todo.isDone ? (
            <Feather name="check-circle" size={24} color="black" />
          ) : (
            <Feather name="circle" size={24} color="black" />
          )}
        </Text>
      </TouchableOpacity>
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
          deleteTodo(todo.id);
        }}
      >
        <Feather name="delete" size={24} color="black" />
      </TouchableOpacity>
      {/* <Ionicons name="pencil-sharp" size={24} color="black" /> */}
    </View>
  );

  //Add todo helper function
  const addTodo = () => {
    const newTodo = {
      id: Math.random(),
      title: todoText,
      isDone: false,
    };

    if (todoText.trim() === "") {
      alert("Please enter a task!");
    } else {
      todos.push(newTodo);
      setTodos(todos);
      setTodoText("");
    }
  };

  //Delete todo helper function
  const deleteTodo = (id: number) => {
    //alert("Delete pushed");
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const searchFunction = () => {
    alert("search clicked!");
    //const filteredTodos = todos.filter(todo) =>todo.title.toLower
  };

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

        {/* user icon with button */}
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
      {/* search bar with button */}
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="search"
          style={styles.searchInput}
          clearButtonMode="always"
          value={searchQuery}
          //onChangeText={setSearchQuery}
          //onSubmitEditing={searchFunction}
        />
      </View>

      <FlatList
        data={todos}
        //pulling data from todos state instead of directly from the toDoData list
        renderItem={({ item }) => <ToDoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={styles.footer}
      >
        {/* Text Input field for adding items */}
        <TextInput
          value={todoText}
          onChangeText={(text) => {
            setTodoText(text);
            // console.log(
            //   `todoText after add textChange in input field: ${todoText}`
            // );
          }}
          placeholder="Add to do item"
          style={styles.newToDoInput}
          clearButtonMode="always"
          autoCorrect={false}
          autoCapitalize="sentences"
          onSubmitEditing={() => {
            addTodo();
          }}
        />

        {/* Plus button to add new item to list */}
        <TouchableOpacity
          onPress={() => {
            addTodo();
            //alert(todoText);
            // console.log(`todoText after add button item to list: ${todoText}`);
          }}
          style={styles.addButton}
        >
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
