import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CardProps = {
  title: string;
  body: string;
  footer: string;
};

const Card: React.FC<CardProps> = ({ title, body, footer }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardBody}>{body}</Text>
      <Text style={styles.cardFooter}>{footer}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 22,
    marginTop: 20,
    elevation: 4,
  },
  cardTitle: { fontSize: 17, marginBottom: 12, color: "#000" },
  cardBody: { fontSize: 14, color: "#7F7F7F", marginBottom: 12 },
  cardFooter: { fontSize: 12, color: "#A8A8A8" },
});
