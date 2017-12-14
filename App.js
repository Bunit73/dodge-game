import React from 'react';
import { StyleSheet, View } from 'react-native';

import Score from "./components/Score";
import Board from "./components/Board";

export default class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          gameState: 'new'
      }
  }

  setGameState = (state) => {
      // console.log('set state')
      this.setState({
          gameState: state
      });
  };

  getGameState = () => {
      return this.state.gameState;
  };


  render() {
    return (
      <View style={styles.container}>
        <Score
            getGameState={this.getGameState}
        />
        <Board
            setGameState={this.setGameState}
        />
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
