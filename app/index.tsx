import { Link, Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function IndexRoot() {
  return (
    <React.Fragment>
      <Stack.Screen name="index" />
      <SafeAreaView style={styles.container}>
        <Link href={"/profile"}>
          <Text>Navigate to the profile screen</Text>
        </Link>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
