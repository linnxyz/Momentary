import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DeleteOptions from "@/components/DeleteOptions";

type CreateNoteFormProps = {
  onSubmit: (title: string, body: string, deleteAfter: string) => void;
};

const TITLE_MAX_LENGTH = 50;

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [deleteAfter, setDeleteAfter] = useState("1h");

  const handleSave = () => {
    if (!title || !body) {
      Alert.alert("Error", "Please fill out both title and body");
      return;
    }
    onSubmit(title, body, deleteAfter);
    // reset after saving
    setTitle("");
    setBody("");
    setDeleteAfter("1h");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ ...styles.container, paddingBottom: 100 }}>
        <DeleteOptions
          options={["1h", "1 day", "1 week"]}
          selectedOption={deleteAfter}
          onChange={setDeleteAfter}
        />

        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="Enter title"
          value={title}
          onChangeText={(text) => {
            if (text.length <= TITLE_MAX_LENGTH) setTitle(text);
          }}
          multiline
          scrollEnabled={false}
        />

        <TextInput
          style={[styles.input, styles.bodyInput]}
          placeholder="Write your note..."
          value={body}
          onChangeText={setBody}
          multiline
          scrollEnabled={false}
        />
      </ScrollView>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Note</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CreateNoteForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 0,
    marginBottom: 20,
    backgroundColor: "#FFF",
  },
  titleInput: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  bodyInput: {
    fontSize: 20,
    textAlignVertical: "top",
    minHeight: 150,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#191919",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
