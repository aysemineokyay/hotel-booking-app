import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // expo kullanıyorsanız
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>General</Text>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="person-outline" size={30} color="black" />
        <Text style={styles.text}>Edit Profile</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="lock-closed-outline" size={30} color="black" />
        <Text style={styles.text}>Change Password</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
      <Ionicons name="notifications-outline" size={30} color="black" />
        <Text style={styles.text}>Notifications</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
      <MaterialCommunityIcons name="shield-key-outline" size={30} color="black" />
        <Text style={styles.text}>Security</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
      <AntDesign name="earth" size={30} color="black" />
        <Text style={styles.text}>Language</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.header}>Preferences</Text>
      {/* Preferences altındaki ayarlar da benzer şekilde eklenir... */}

      {/* Logout butonu */}
      <TouchableOpacity style={styles.item}>
        <Feather name="shield" size={30} color="black" />
        <Text style={styles.text}>Language</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Feather name="help-circle" size={30} color="black" />
        <Text style={styles.text}>Help & Support</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="log-out-outline" size={30} color="#ff0000" />
        <Text style={styles.text} >Logout</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2', // Her bir TouchableOpacity bileşeni arasına dikey boşluk ekler
    // Alternatif olarak, marginBottom ve marginTop özelliklerini ayrı ayrı da kullanabilirsiniz:
    // marginBottom: 8,
    // marginTop: 8,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    
  },
});

export default SettingsScreen;