import React from 'react';
import { StyleSheet, View } from 'react-native';

import Score from "./components/Score";
import Board from "./components/Board";

export default class App extends React.Component {

  constructor(props){
      super(props);
  }


  render() {
    return (
      <View style={styles.container}>
        <Score/>
        <Board/>
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
