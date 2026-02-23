import React from "react";
import { Pressable, View, Text, StyleSheet, Alert, ViewStyle, TextStyle } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const FocusButton: React.FC<Props> = ({ label, onPress, style, textStyle }) => {
  return (
    <Pressable
      style={[styles.bottomButton, style]}
      onPress={onPress ?? (() => Alert.alert(`${label} pressed`))}
    >
      <View style={styles.row}>
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default FocusButton;

const styles = StyleSheet.create({
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ff6767ff",
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
