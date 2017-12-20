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
          gameState: 'home',
          score: 0,
          highScore: 0
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

  updateScore = (val) => {
      this.setState({
          score: val
      })
  };


  render() {
    return (
      <View style={styles.container}>
        <Score
            score={this.state.score}
            getGameState={this.getGameState}
            updateScore={this.updateScore}
        />
        <Board
            setGameState={this.setGameState}
        />
        {renderIf((this.state.gameState === 'end'),
            <GameOver
                score={this.state.score}
                updateScore={this.updateScore}
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
