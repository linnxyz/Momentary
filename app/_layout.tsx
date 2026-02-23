import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs layout */}
      <Stack.Screen
        name="(tabs)"              // your tabs folder
        options={{
          headerShown: false,      // hides top bar for all tabs screens
        }}
      />

      {/* Create Note screen */}
      <Stack.Screen
        name="create-note"
        options={{
          title: "Create Note",
          headerBackTitle: "Home",
          headerShown: true,       // show top bar here
        }}
      />
    </Stack>
  );
}
