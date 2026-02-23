import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopBar: React.FC = () => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarText}>Momentary Notes</Text>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    height: 120,
    justifyContent: "center",
    top: 10,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  topBarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});
