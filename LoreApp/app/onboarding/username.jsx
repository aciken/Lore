import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function UsernameScreen() {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (username.trim()) {
      router.push({
        pathname: '/modal/signup',
        params: { username: username.trim() },
      });
    } else {
      Alert.alert('Please enter a username.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/compasImage.png')}
        style={styles.backgroundImage}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.topSection}>
            <Ionicons name="compass-outline" size={60} color="rgba(0, 221, 255, 0.5)" />
            <Text style={styles.title}>Create Your Identity</Text>
            <Text style={styles.subtitle}>This will be your name in the world of Lore.</Text>
        </View>
        
        <View style={styles.middleSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="#8A92B2"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <LinearGradient
              colors={isFocused 
                ? ['rgba(0, 221, 255, 0)', 'rgba(0, 221, 255, 1)', 'rgba(0, 221, 255, 0)'] 
                : ['#1E2747', '#1E2747']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.line}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleContinue}
          >
            <View style={styles.buttonShadow}>
              <LinearGradient
                colors={['#00DDFF', '#00AADD']}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1126',
  },
  backgroundImage: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '80%',
    opacity: 0.05,
    resizeMode: 'contain',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  middleSection: {},
  bottomSection: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    color: '#B3B8C8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  line: {
    height: 2,
    borderRadius: 1,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonShadow: {
    backgroundColor: '#006C8D',
    borderRadius: 30,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    transform: [{ translateY: -6 }],
  },
  buttonText: {
    color: '#0C1126',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
