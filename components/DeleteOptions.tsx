import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const DeleteOptions: React.FC<{
  options: string[];
  selectedOption: string | null;
  onChange: (selected: string) => void;
}> = ({ options, selectedOption, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Delete after:</Text>

      <View style={styles.optionsRow}>
        {options.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => onChange(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default DeleteOptions;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 13,
    color: "#858585ff",
  },

  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  selectedOption: {
    backgroundColor: "#191919",
    borderColor: "#191919",
  },

  optionText: {
    fontSize: 16,
    color: "#858585ff",
  },

  selectedOptionText: {
    color: "#fff",
    fontWeight: "600",
  },
});
