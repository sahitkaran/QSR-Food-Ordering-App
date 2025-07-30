import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function Welcome(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Order Type</Text>

      <TouchableOpacity style={[styles.button, styles.dineInButton]}
        onPress={() =>  props.navigation.navigate('DineInScreen')}>
        <View style={styles.buttonContent}>
          <Image source={require('../assets/cutlery.png')}
            style={styles.buttonImage}/>
          <Text style={styles.buttonText}>Dine In</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.takeawayButton]}
        onPress={() => props.navigation.navigate('TakeawayScreen')}>
        <View style={styles.buttonContent}>
          <Image source={require('../assets/take-away.png')}
          style={styles.buttonImage} />
          <Text style={styles.buttonText}>Takeaway</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  dineInButton: {
    backgroundColor: 'blue',
  },
  takeawayButton: {
    backgroundColor: 'red',
  },
  buttonContent: {
    alignItems: 'center', 
  },
  buttonImage: {
    width: 40,
    height: 40,
    alignItems: 'center', 
    marginBottom: 5, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
