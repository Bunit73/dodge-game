import React, { Component } from 'react';


import { StyleSheet, Text, View } from "react-native";

class Score extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this._startScoring();
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.scoreText}>Score: {this.props.score}</Text>
            </View>
        )
    }

    _startScoring(){
        let calculateScore = setInterval(() => {
            if(this.props.getGameState() === 'end'){

            } else {
                this.props.updateScore(1 + this.props.score);
            }
        },1000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: 80,
        backgroundColor: '#1211d6',
        justifyContent: 'center'
    },
    scoreText: {
        color: '#fff',
        fontSize: 40,
        padding: 10,
        top: 10,
    }
});

export default Score;