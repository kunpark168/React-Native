import React, { Component } from 'react';
import {
 View,
 Text
} from 'react-native';
export default class MovieDetail extends Component<{}> {
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'red'}}>
        <Text style = {{fontSize : 20, color : 'white'}}>{params.fiml_id}</Text>
      </View>
    );
  }
}
