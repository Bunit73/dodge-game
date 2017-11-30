import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Score from "./components/Score";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {score: 0};
    }

  render() {
    return (
      <View style={styles.container}>
          <Score s={this.state.score}/>
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
