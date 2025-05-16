// screens/TestScreen.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TestScreen() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          console.log("Text changed:", newText); // Log the new text
        }}
        placeholder="Type something here"
      />
      <Text>Current text: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
