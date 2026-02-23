import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CreateNoteForm from "@/components/CreateNoteForm";
import DeleteOptions from "@/components/DeleteOptions";
import { addNote } from "@/lib/noteStorage";

const CreateNotePage: React.FC = () => {
    const router = useRouter();
    const handleSaveNote = async (title: string, body: string, deleteAfter: string) => {
      await addNote(title, body, deleteAfter);
      console.log("saved" + title, body, deleteAfter)
      router.back(); // go back after saving
    };
    return (
        <SafeAreaView style={styles.container}>
          <CreateNoteForm onSubmit={handleSaveNote} />
        </SafeAreaView>
    );
};

export default CreateNotePage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
});
