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
            bulletCords: []
        }
    }

    updatePlayerCords = (x,y) => {
        this.setState({playerCords: {'x': x, 'y': y }});
        // console.log(this.state);
        this.testCollision();
    };


    addBullet = (id, x, y, r) => {
        this.setState({
            bulletCords: [...this.state.bulletCords, {id: id, x: x, y: y, r: r}]

        });
        //this.setState({bulletCords: this.state.bulletCords.concat({id: id, x: -100, y: -100})});
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
        // this.setState({bulletCords: bullets});
        // console.log(this.state);
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
              //   console.log(`player cords: X: ${player.x} Y: ${player.y}
              // bullet cords X: ${bullet.x} Y: ${bullet.y} `);
                console.log('ded');
                break;
            }
        }
    };

    render() {
        return(
            <View style={styles.container}>
                <Player updateCords={this.updatePlayerCords}/>
                <Bullet
                    initBullet={this.addBullet}
                    updateCords={this.updateBulletCords}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 100 }
});

export default Board;