import React, { Component } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';

let styles = StyleSheet.create({
  emptyView:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding:50,
  },
  emptyText:{
    fontSize: 16,
    textAlign: 'center',
    color: '#A9A9A9',
  },
});

export default class EmptyView extends Component<{}> {
  render(){
    return (
      <View style={styles.emptyView}>
        <Text style = {styles.emptyText}>
          Không tìm thấy.
        </Text>
      </View>
    );
  }
};
