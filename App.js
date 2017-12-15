import React from 'react';
import { StyleSheet, View } from 'react-native';

import renderIf from "./helpers/renderif";

import Score from "./components/Score";
import Board from "./components/Board";
import GameOver from "./components/GameOver";

export default class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          gameState: 'new'
      }
  }

  setGameState = (state) => {
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
        {renderIf((this.state.gameState === 'end'),
            <GameOver
                setGameState={this.setGameState}
            />
        )}
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
