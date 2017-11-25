import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator
} from 'react-native';

let styles = StyleSheet.create({
  loading:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    color: "#ffffff"
  },
});

export default class LoadingView extends Component<{}> {
  render(){
    return(
      <View style={styles.loading}>
        <ActivityIndicator size='large'/>
        <Text style = {styles.text}>Đang tải dữ liệu...</Text>
      </View>
    );
  }
};
