import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import FocusButton from "@/components/FocusButton";

export default function FocusScreen() {
  const router = useRouter();
  const soundRef = React.useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const toggleSound = async () => {
    try {
      // First click → play
      if (!isPlaying) {
        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/sounds/calm.mp3")
        );

        soundRef.current = sound;
        await sound.playAsync();

        setIsPlaying(true);
      }

      // Second click → stop
      else {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("Sound error:", e);
    }
  };

  const handlePress = async () => {
    await toggleSound();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Focus Mode</Text>

      <Image
        source={require("../../assets/images/gradient.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <FocusButton
        label={isPlaying ? "Stop Music" : "Play Calm Music"}
        style={{ backgroundColor: isPlaying ? "#ff5555ff" : "#52b1ffff" }}
        textStyle={{ color: isPlaying ? "white" : "white" }}
        onPress={handlePress}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 340,
    height: 340,
    marginBottom: 20,
  },
  playing: {
    backgroundColor: "red",
  },
  notPlaying: {
    backgroundColor: "green",
  },
});
