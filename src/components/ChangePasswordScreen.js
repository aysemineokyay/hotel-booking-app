import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const PasswordChangeScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleChangePassword = () => {

    console.log('Şifre değiştiriliyor...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="lock" size={24} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder="Enter new password"
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.inputWithIcon}>
          <Icon name="lock" size={24} color="#000" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm your new password"
            secureTextEntry={hideConfirmPassword}
          />
          <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
            <Icon name={hideConfirmPassword ? 'eye-slash' : 'eye'} size={24} color="#000" />
            
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Change Now" color="#007AFF" onPress={handleChangePassword} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  inputLabel: {
    fontWeight: '600',
    marginTop: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10, 
    position: 'absolute', 
    bottom: 0, 
    left: 5,
    right: 5,
    backgroundColor: '#fff', 
    borderTopWidth: 0, 

    
  },
});

export default PasswordChangeScreen;
