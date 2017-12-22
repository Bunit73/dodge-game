"use strict";

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

const Dimensions = require('Dimensions');
const BULLET_SIZE = 40;
const BULLET_COLOR = "black";
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class Bullet extends Component {
    _bulletStyles = {};
    bullet = null;

    constructor(props){
        super(props);
        this.state = {
            id: (new Date).getTime(),
            x: 0,
            y: 0,
            moveX:0,
            moveY:0,
            speed: 1
        };
    }

    componentWillMount(){
        this.createBullet();
        this._resetPosition();

    }

    componentDidMount(){
        this._updatePosition();
    }

    createBullet = () =>{
        this.props.initBullet(this.state.id, -100, -100, BULLET_SIZE);
        let updateScreen = setInterval(()=>{
            if(this.props.gameOverCheck()){
                console.log('game over');
                clearInterval(updateScreen);
            }
            this._moveBullet(this.state.moveX,this.state.moveY);
        },10);
    };

    _moveBullet(left,top){
        top = (typeof top !== 'undefined') ?  top : 1;
        left = (typeof left !== 'undefined') ?  left : 1;

        this._bulletStyles.style.top = this._bulletStyles.style.top + top;
        this._bulletStyles.style.left = this._bulletStyles.style.left + left;

        //Rest if out of bounds
        if(this._bulletStyles.style.top > WINDOW_HEIGHT + 10
            || this._bulletStyles.style.top < -10
            || this._bulletStyles.style.left > WINDOW_WIDTH + 10
            || this._bulletStyles.style.left < -10
        ){
            this._resetPosition();
        }

        this._updatePosition();
    }

    _resetPosition(){
        let spawnVertical = Math.random() >= 0.5;
        let x = Math.random() * WINDOW_WIDTH;
        let y = Math.random() * WINDOW_HEIGHT;

        let moveX = 0;
        let moveY = 0;


        if(spawnVertical){
            let spawnTop = Math.random() >= 0.5;
            if(spawnTop){
                y = 0;
                moveY = (Math.random() * ( 2 - 1) + 1) * this.state.speed;
            } else{
                y = WINDOW_HEIGHT;
                moveY = (Math.random() * ( 2 - 1) + 1) * -1 * this.state.speed;
            }
        } else {
            let spawnLeft = Math.random() >= 0.5;
            if(spawnLeft){
                x = 0;
                moveX = (Math.random() * ( 2 - 1) + 1) * this.state.speed;
            } else{
                x = WINDOW_WIDTH;
                moveX = (Math.random() * ( 2 - 1) + 1) * -1 * this.state.speed;
            }
        }

        let speed = this.state.speed + .25;
        this.setState({speed: speed});


        this._setBulletCourse(moveX,moveY);

        this._bulletStyles = {
            style: {left: x, top: y}
        };
    }

    _setBulletCourse(x,y){
        // console.log(`X: ${x} Y: ${y}`);
        this.setState({
            moveX: x,
            moveY: y
        });
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