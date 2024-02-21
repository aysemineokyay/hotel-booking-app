import { StyleSheet, SafeAreaView,Text, View } from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview';

const LegalAndPoliciesScreen = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <WebView
        source={{uri: 'https://www.freeprivacypolicy.com/live/19555f6b-252e-467f-9247-25ff5cdbab92'}}
        style={styles.flexContainer}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});

export default LegalAndPoliciesScreen
