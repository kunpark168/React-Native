import React, { Component } from 'react';
import {
  View, StyleSheet , Text,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Main from "./components/main/Main";

class HomeScreen extends Component{
  static navigationOptions = {
    header : null,
  };
  render (){
    return <Main />;
  }
}

export default class App extends Component<{}> {
  render() {
    return <SimpleNavigator />;
  }
}

const SimpleNavigator = StackNavigator({
  Home: { screen: HomeScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
