import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/TopBar";
import BottomButton from "@/components/BottomButton";
import Card from "@/components/Card";
import { useRouter } from "expo-router";
import { getNotes, deleteExpiredNotes } from "@/lib/noteStorage";
import { useFocusEffect } from "@react-navigation/native";

type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  expiresAt: number;
};

const Index: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const loadNotes = async () => {
    await deleteExpiredNotes(); // remove expired notes
    const savedNotes = await getNotes();
    setNotes(savedNotes);
  };

  // Refresh every time screen is focused
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {notes.map((note) => {
          const now = Date.now();
          const timeLeft = note.expiresAt - now;
          let footer = "Deleting soon";
          if (timeLeft > 0) {
            const hours = Math.ceil(timeLeft / (1000 * 60 * 60));
            footer = `Deleting in less than ${hours}h`;
          }

          return (
            <Card
              key={note.id}
              title={note.title}
              body={note.body}
              footer={footer}
            />
          );
        })}
      </ScrollView>
      <BottomButton
        label="Create Note"
        onPress={() => router.push("/create-note")}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 19,
  },
});
