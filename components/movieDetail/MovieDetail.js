import React, { Component } from 'react';
import {
 View,
 StyleSheet,
 Dimensions,
 StatusBar,
} from 'react-native';
export default class MovieDetail extends Component<{}> {
  render() {
    return (
      <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'red'}}>
        <Text style = {{fontSize : 20, color : 'white'}}>Movie Detail</Text>
      </View>
    );
  }
}
