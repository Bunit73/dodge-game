"use strict";

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Player from "./Player";
import Bullet from "./Bullet";

class Board extends  Component {
    constructor(props){
        super(props);

        this.state = {
            playerCords: {x: 0, y: 0 },
            bulletCords: [],
            gameOver: false
        }
    }

    updatePlayerCords = (x,y) => {
        this.setState({playerCords: {'x': x, 'y': y }});
        this.testCollision();
    };


    addBullet = (id, x, y, r) => {
        let newCords = this.state.bulletCords;
        newCords.push({id: id, x: x, y: y, r: r});
        this.setState({
            bulletCords: newCords
        });
    };

    updateBulletCords = ( id, x, y) => {
        let bullets = [...this.state.bulletCords];
        for(let i = 0; i < bullets.length; i++){
            if(bullets[i].id === id){
                bullets[i].x = x;
                bullets[i].y = y;
                break;
            }
        }
        this.testCollision();
        // console.log(this.state.bulletCords);
    };

    testCollision = () => {
        let player = this.state.playerCords;
        for(let i = 0; i < this.state.bulletCords.length; i++){
            let bullet = this.state.bulletCords[i];
            let dx = player.x - bullet.x;
            let dy = player.y - bullet.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if(
                // dist < player.r + bullet.r
                dist < 40

            )
            {
                this.setState({gameOver: true});
                break;
            }
        }
    };

    gameOver = () => {
        if(this.state.gameOver){
            this.props.setGameState('end');
        }
        return this.state.gameOver;
    };

    resetBoard = () => {
        console.log('reset board');
        this.setState({
            gameOver: false,
            bulletCords: []
        });

        this.refs.bullet1.createBullet();
        this.refs.bullet2.createBullet();

        this.refs.bullet1._moveBullet(-100,-100);
        this.refs.bullet2._moveBullet(-100,-100);

        // this.refs.bullet1.createBullet();
        // this.refs.bullet1._resetPosition();
        // this.refs.bullet1._updatePosition();
        //
        // this.refs.bullet2.createBullet();
        // this.refs.bullet2._resetPosition();
        // this.refs.bullet2._updatePosition();
    };

    render() {
        return(
            <View style={styles.container}>
                <Player updateCords={this.updatePlayerCords}/>
                <Bullet
                    ref='bullet1'
                    initBullet={this.addBullet}
                    updateCords={this.updateBulletCords}
                    gameOverCheck={this.gameOver}
                />
                <Bullet
                    ref='bullet2'
                    initBullet={this.addBullet}
                    updateCords={this.updateBulletCords}
                    gameOverCheck={this.gameOver}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 100 }
});

export default Board;