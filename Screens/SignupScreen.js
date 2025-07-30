import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUser } from '../Components/Authenticate'; // Import your Firebase sign-up logic

function SignUpScreen(props) {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSignUp() {
    if (email && confirmEmail && password && confirmPassword) {
      if (email !== confirmEmail) {
        Alert.alert('Sign Up Failed', 'Emails do not match.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Sign Up Failed', 'Passwords do not match.');
        return;
      }
      try {
        const token = await createUser(email, password); // Use the `createUser` function
        console.log('Firebase Token:', token);
        Alert.alert('Sign Up Successful', 'Welcome!');
        props.navigation.navigate('Welcome'); // Navigate to Welcome screen
      } catch (error) {
        Alert.alert('Sign Up Failed', 'Unable to create account. Please try again.');
        console.error('Sign Up Error:', error);
      }
    } else {
      Alert.alert('Sign Up Failed', 'Please fill in all fields.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Confirm Email Address"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.inputField}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

export default SignUpScreen;
