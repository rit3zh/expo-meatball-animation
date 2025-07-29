import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ animation: "simple_push" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
