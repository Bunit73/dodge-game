// Adapted from https://github.com/facebook/react-native/blob/master/
// Examples/UIExplorer/PanResponderExample.js

"use strict";

import React, { Component } from "react";
import { StyleSheet, PanResponder, View } from "react-native";

const Dimensions = require('Dimensions');
const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = "blue";
const CIRCLE_HIGHLIGHT_COLOR = "green";
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class Player extends Component {
    // Set some initial values.
    _panResponder = {};
    _previousLeft = 0;
    _previousTop = 0;
    _circleStyles = {};
    circle = null;

    constructor(props) {
        super(props);
        this.state = {
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
        this._previousLeft = WINDOW_WIDTH *.45;
        this._previousTop = WINDOW_HEIGHT *.4;
        this._circleStyles = {
            style: { left: this._previousLeft, top: this._previousTop }
        };
    }

    componentDidMount() {
        this._updatePosition();
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    ref={circle => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }

    // _highlight and _unHighlight get called by PanResponder methods,
    // providing visual feedback to the user.
    _highlight = () => {
        this.circle &&
        this.circle.setNativeProps({
            style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR }
        });
    };

    _unHighlight = () => {
        this.circle &&
        this.circle.setNativeProps({ style: { backgroundColor: CIRCLE_COLOR } });
    };

    // We're controlling the circle's position directly with setNativeProps.
    _updatePosition = () => {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    };

    _handleStartShouldSetPanResponder = (event, gestureState) => {
        // Should we become active when the user presses down on the circle?
        return true;
    };

    _handleMoveShouldSetPanResponder = (event, gestureState) => {
        // Should we become active when the user moves a touch over the circle?
        return true;
    };

    _handlePanResponderGrant = (event, gestureState) => {
        this._highlight();
    };

    _handlePanResponderMove = (event, gestureState) => {
        this.setState({
            stateID: gestureState.stateID,
            moveX: gestureState.moveX,
            moveY: gestureState.moveY,
            x0: gestureState.x0,
            y0: gestureState.y0,
            dx: gestureState.dx,
            dy: gestureState.dy,
            vx: gestureState.vx,
            vy: gestureState.vy,
            numberActiveTouches: gestureState.numberActiveTouches
        });

        // Calculate current position using deltas
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;

        console.log(`Coords X:${gestureState.moveX} Y:${gestureState.moveY}`);

        if(gestureState.moveY < 100){
            this._circleStyles.style.top = 0;
        }

        if(gestureState.moveY > WINDOW_HEIGHT - 2){
            this._circleStyles.style.top =  WINDOW_HEIGHT * .875;//WINDOW_HEIGHT - CIRCLE_SIZE;
            console.log(`Out of bottom X:${this._circleStyles.style.left} Y :${this._circleStyles.style.top}`);
        }

        if(gestureState.moveX < 1){
            this._circleStyles.style.left = 1;
        }

        if(gestureState.moveX > WINDOW_WIDTH - 2){
            this._circleStyles.style.left = WINDOW_WIDTH - 10;
        }

        this._updatePosition();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;

        if(gestureState.moveY < 100){
            this._previousTop = 0;
        }

        if(gestureState.moveY > WINDOW_HEIGHT - 2){
            this._previousTop = WINDOW_HEIGHT * .875;//WINDOW_HEIGHT - CIRCLE_SIZE;
        }

        if(gestureState.moveX < 1){
            this._previousLeft = 1;
        }

        if(gestureState.moveX > WINDOW_WIDTH - 2){
            this._previousLeft = WINDOW_WIDTH - 10;
        }
    };
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: "absolute",
        left: 0,
        top: 0
    },
    container: { flex: 1, paddingTop: 100 }
});

export default Player;