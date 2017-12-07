"use strict";

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

const Dimensions = require('Dimensions');
const BULLET_SIZE = 40;
const BULLET_COLOR = "black";
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class Bullet extends Component {
    _previousLeft = 0;
    _previousTop = 0;
    _bulletStyles = {};
    bullet = null;

    constructor(props){
        super(props);
        this.state = {
            id: (new Date).getTime(),
            x: 0,
            y: 0
        };
        this.props.initBullet(this.state.id, -100, -100, BULLET_SIZE);
        setInterval(()=>{
            this.moveBullet();
        },1000);
    }

    componentWillMount(){
        this._previousLeft = 200;
        this._previousTop = -10;
        this._bulletStyles = {
            style: {left: this._previousLeft, top: this._previousTop}
        };
    }

    componentDidMount(){
        this._updatePosition();
    }

    moveBullet(){
        // Calculate current position using deltas
        // this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._bulletStyles.style.top = this._bulletStyles.style.top + 10;
        this._updatePosition();
    }

    render() {
        return (
            <View
                ref={ bullet => {
                    this.bullet = bullet;
                }}
                style={styles.bullet}
            />
        )
    }

    _updatePosition = () => {
        this.bullet && this.bullet.setNativeProps(this._bulletStyles);
        this.props.updateCords(this.state.id, this._bulletStyles.style.left, this._bulletStyles.style.top);
    }
}

const styles = StyleSheet.create({
    bullet: {
        width: BULLET_SIZE,
        height: BULLET_SIZE,
        borderRadius: BULLET_SIZE / 2,
        backgroundColor: BULLET_COLOR,
        position: 'absolute',
        left: 0,
        top: 0
    }
});

export default Bullet;