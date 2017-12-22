"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class GameOver extends Component{
    constructor(props){
        super(props);
    }

    _newGame = () => {
        console.log('new game');
        this.props.setGameState('new');
        this.props.updateScore(0);
        this.props.resetGame();
    };

    render(){
        return(
            <View style={styles.overlay}>
                <Text style={styles.messageText}>
                    Game Over
                </Text>
                <Text style={styles.messageText}>
                    Score: {this.props.score}
                </Text>
                <Button
                    title="New Game"
                    onPress={this._newGame}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlay:{
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 1,
        backgroundColor: '#666666'
    },
    messageText:{
        fontSize: 40,
        color:'#ffffff',
        textAlign:'center',
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonStyle:{
        alignItems: 'center',
        justifyContent:'center',
        paddingTop: '20'
    }

});

export default GameOver;