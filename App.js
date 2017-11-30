import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Player from "./components/Player";
import Score from "./components/Score";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Score/>
        <Player/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
