import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CHOICES = [
  {
    name: "rock",
    uri: "http://pngimg.com/uploads/stone/stone_PNG13622.png",
  },
  {
    name: "paper",
    uri: "https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png",
  },
  {
    name: "scissors",
    uri:
      "http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
