import React, { Component } from 'react';


import { StyleSheet, Text, View } from "react-native";

class Score extends Component {

    constructor(props){
        super(props);
        this.state = {
            s: 0
        };

    }

    componentWillMount() {
        setInterval(() => {
            this._updateScore(1)
        },1000);
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.scoreText}>Score: {this.state.s}</Text>
            </View>
        )
    }

    _updateScore(val){
        score = this.state.s += val;
        this.setState({s: score});
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