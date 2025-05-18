import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import iconImage from "@/assets/images/user-icon.png";
import { ToDoType } from "@/constants/list_data";

export default function Index() {
  // const router = useRouter();
  // To add button back in, move this to the return statement
  //   <Button
  //   title="Go to Test Screen"
  //   onPress={() => router.push("/test")} // Navigate to the Test screen
  // />

  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

  //useEffect for main app
  useEffect(() => {
    // Fetch todos from AsyncStorage when the component mounts
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          const parsedTodos = JSON.parse(todos);
          setTodos(parsedTodos);
          setOldTodos(parsedTodos); // Set the original todos for searching
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

  //useEffect for search function
  useEffect(() => {
    if (oldTodos.length > 0) {
      onSearch(searchQuery);
    }
  }, [searchQuery, oldTodos]);

  // ToDoItem is the flat list (renderitem) component
  const ToDoItem = ({
    todo,
    deleteTodo,
    handleTodo,
  }: {
    todo: ToDoType;
    deleteTodo: (id: number) => void;
    handleTodo: (id: number) => void;
  }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => handleTodo(todo.id)}>
        {todo.isDone ? (
          <Feather name="check-circle" size={24} color="black" />
        ) : (
          <Feather name="circle" size={24} color="black" />
        )}
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
  const addTodo = async () => {
    try {
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
        setOldTodos(todos);
        Keyboard.dismiss();
        await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
        setTodoText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete todo helper function
  const deleteTodo = async (id: number) => {
    try {
      //alert("Delete pushed");
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  //Toggle isDone helper function
  const handleTodo = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  //Search helper function
  const onSearch = (query: string) => {
    if (query == "") {
      if (todos !== oldTodos) {
        setTodos(oldTodos);
      }
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredTodos.length !== todos.length) {
        setTodos(filteredTodos);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
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
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        //pulling data from todos state instead of directly from the toDoData list
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleTodo={handleTodo}
          />
        )}
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
          accessible={true}
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
    marginBottom: 10,
    marginTop: Platform.OS === "ios" ? 0 : 30,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 8,

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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: Platform.OS === "ios" ? 0 : 30,
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
