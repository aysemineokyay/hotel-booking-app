import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditProfileScreen = () => {
  return (
    <View>
      <Text>EditProfileScreen</Text>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({})












// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import * as Google from 'expo-auth-session/providers/google';

// const ProfileScreen = () => {
//   const [username, setUsername] = useState('');
//   const [emailOrPhone, setEmailOrPhone] = useState('');

//   // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//   //   clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
//   // });

//   // useEffect(() => {
//   //   if (response?.type === 'success') {
//   //     const { id_token } = response.params;
//   //     console.log(id_token);
//   //   }
//   // }, [response]);

//   const handleSaveChanges = () => {
//     // Bu kısımda verileri bir backend servisine gönderebilirsiniz.
//     // Örneğin, bir API isteği yapabilirsiniz.
//     // Burada basitçe konsola yazdırıyoruz.
//     console.log("Saving changes...");
//     console.log("Username: ", username);
//     console.log("Email or Phone: ", emailOrPhone);

//     // Kullanıcıya geri bildirim sağlamak için bir uyarı mesajı gösterebilirsiniz.
//     Alert.alert("Profil Kaydedildi", "Yaptığınız değişiklikler başarıyla kaydedildi.");
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* <Image
//         source={{ uri: 'https://avatars.githubusercontent.com/u/119885448?v=4' }}
//         style={{ width: 100, height: 100, borderRadius: 50 }}
//       /> */}

//       <View style={styles.container}>
//         <View style={styles.inputContainer}>
//           <MaterialCommunityIcons name="account-circle-outline" size={35} color="blue" />
//           <TextInput
//             style={styles.input}
//             placeholder="Please Username"
//             onChangeText={text => setUsername(text)}
//             value={username}
//           />
//         </View>
//         <View style={styles.inputContainer}>
//           <Ionicons name="mail-outline" size={35} color="blue" />
//           <TextInput
//             style={styles.input}
//             placeholder="Please Email and Phone Number"
//             onChangeText={text => setEmailOrPhone(text)}
//             keyboardType="email-address"
//             value={emailOrPhone}
//           />
//         </View>
//       </View>

//       <View style={{ marginVertical: 20 }}>
//         <TouchableOpacity
//           onPress={() => {
//             promptAsync();
//           }}
//           style={{ backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 15 }}
//         >
//           <Text style={{ color: 'white' }}>Sign in with Google</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         onPress={handleSaveChanges}
//         style={{ backgroundColor: 'blue', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 15 }}
//       >
//         <Text style={{ color: 'white' }}>Save Changes</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '80%', 
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 2,
//     borderBottomColor: '#cccccc',
//   },
//   input: {
//     flex: 1, 
//     marginLeft: 10, 
//     fontSize: 16,
//   },
// });

// export default ProfileScreen;
