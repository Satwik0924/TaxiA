import React from 'react';
import { ThemedText } from "./ThemedText";
import { useAuth } from "../hooks/useAuth";
import { Button, Image, Platform, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';

export default function ProfileCard() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  
  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ThemedText>Not signed in</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.picture || 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />

        <View>
          <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
            {user.name}
          </ThemedText>
          <ThemedText style={{ fontSize: 14, color: "gray" }}>
            {user.email}
          </ThemedText>
        </View>
      </View>

      <Button title="Sign Out" onPress={handleSignOut} color={"red"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxWidth: 400,
    gap: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});