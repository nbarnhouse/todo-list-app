import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";

import { todoData } from "@/constants/list_data";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={todoData}
        renderItem={({ item }) => (
          <Text>
            {item.id} - {item.title}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.view}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
