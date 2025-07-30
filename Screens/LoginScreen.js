import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { AuthContext } from '../Components/AuthContext';
import { validateUser } from '../Components/Authenticate';

function LoginScreen(props) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const ctx = useContext(AuthContext);

   async function handleSubmit() {
      try {
         const token = await validateUser(username, password); 
         ctx.auth(token); 
      } catch (error) {
         Alert.alert('Login Error', 'The username and password do not match.');
      }
   }

   function navigateToSignUp() {
      props.navigation.navigate('Signup');
   }

   return (
      <View style={styles.container}>
         <Image
            source={require('../assets/splash-icon.png')} 
            style={styles.logo}
            resizeMode="contain"
         />
         <Text style={styles.title}>Login</Text>
         <TextInput
            style={styles.inputField}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none" 
         />
         <TextInput
            style={styles.inputField}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
         />
         <View style={styles.buttons}>
            <TouchableOpacity onPress={handleSubmit}>
               <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSignUp}>
               <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
         </View>
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
   logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
   },
   inputField: {
      height: 50,
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'white',
   },
   buttons: {
      alignItems: 'center',
      marginTop: 20,
   },
   button: {
      color: 'blue',
      fontSize: 16,
      marginBottom: 10,
   },
});

export default LoginScreen;
