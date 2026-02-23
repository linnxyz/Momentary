import React from "react";
import { Pressable, View, Text, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  onPress?: () => void;
};

const BottomButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <Pressable
      style={styles.bottomButton}
      onPress={onPress ?? (() => Alert.alert(`${label} pressed`))}
    >
      <View style={styles.row}>
        <MaterialIcons name="add" size={32} color="#FFF" style={{ marginRight: 17 }} />
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#191919",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#0000004D",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 25,
    color: "#FFF"
  },
});
