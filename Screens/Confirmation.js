import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons

const ConfirmationScreen = ({ navigation }) => {
  const [tokenNumber, setTokenNumber] = useState("");

  // Generate a random token when the screen loads
  useEffect(() => {
    function generateToken() {
      const alphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter (A-Z)
      const digits = Math.floor(100 + Math.random() * 900); // Random 3-digit number
      return `${alphabet}${digits}`;
    }    

    setTokenNumber(generateToken());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageContainer}>
      <Ionicons name="checkmark-circle-outline" size={50} color="#008000" />
        <Text style={styles.successMessage}>
           Order Placed Successfully!
        </Text>
        <Text style={styles.tokenNumber}>Your Token Number: {tokenNumber}</Text>
        <Text style={styles.thankYouMessage}>Thank you for your order!</Text>
      </View>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backButtonText}>Order Received</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  messageContainer: {
    alignItems: "center",
  },
  successMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008000",
    marginBottom: 16,
    flexDirection: "row", 
    alignItems: "center", 
  },
  tokenNumber: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  thankYouMessage: {
    fontSize: 16,
    color: "#666666",
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f33",
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;
