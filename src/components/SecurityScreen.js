import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SecuritySettingsScreen = () => {
  const [isFaceIDEnabled, setFaceIDEnabled] = useState(false);
  const [isRememberPasswordEnabled, setRememberPasswordEnabled] = useState(false);
  const [isTouchIDEnabled, setTouchIDEnabled] = useState(false);

  return (
    <View style={styles.container}> 
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Face ID</Text>
        <Switch
          onValueChange={(value) => setFaceIDEnabled(value)}
          value={isFaceIDEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Remember Password</Text>
        <Switch
          onValueChange={(value) => setRememberPasswordEnabled(value)}
          value={isRememberPasswordEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Touch ID</Text>
        <Switch
          onValueChange={(value) => setTouchIDEnabled(value)}
          value={isTouchIDEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1, // Çerçeve kalınlığı
    borderColor: '#e1e1e1', // Çerçeve rengi
    borderRadius: 10, // Köşelerin yuvarlaklık derecesi
    margin: 10, // Etrafındaki boşluk miktarı
  },
  header: {
    fontSize: 24, // Yazı boyutunu artırıldı
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  textStyle: {
    fontSize: 18, // Yazı boyutunu artırıldı
    fontWeight: 'bold', // Yazıyı kalınlaştırdı
  },
});

export default SecuritySettingsScreen;
