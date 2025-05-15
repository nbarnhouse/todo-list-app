import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { todoData } from "@/constants/list_data";

import iconImage from "@/assets/images/user-icon.png";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            alert("clicked!");
          }}
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
        data={todoData}
        renderItem={({ item }) => (
          <Text style={styles.todoItem}>
            {item.id} - {item.title}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#6200ee", // purple accent
  },
});
