import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationSettingsScreen = () => {
  const [isAssignEnabled, setAssignEnabled] = useState(false);
  const [isCommentEnabled, setCommentEnabled] = useState(false);
  const [isFollowEnabled, setFollowEnabled] = useState(false);
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleSwitch = (setter) => () => setter(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Assign</Text>
        <Switch
          onValueChange={toggleSwitch(setAssignEnabled)}
          value={isAssignEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Comment</Text>
        <Switch
          onValueChange={toggleSwitch(setCommentEnabled)}
          value={isCommentEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Follow</Text>
        <Switch
          onValueChange={toggleSwitch(setFollowEnabled)}
          value={isFollowEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.textStyle}>Notification</Text>
        <Switch
          onValueChange={toggleSwitch(setNotificationEnabled)}
          value={isNotificationEnabled}
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
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    margin: 15,
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
    fontSize: 18, // Artırılmış yazı boyutu
    fontWeight: 'bold', // Kalın yazı tipi
  },
});

export default NotificationSettingsScreen;
