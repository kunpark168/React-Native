import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
export default class SearchBox extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
    return (
      <View style = {styles.search}>
          <TextInput
             style={[styles.textInput, {fontFamily: 'aardvarkcafe'}]}
             onChangeText={(search) => this.setState({search})}
             placeholder = "Search movies"
             underlineColorAndroid = "transparent"
             value={this.state.text}
           />
         <View style = {styles.containerSearch}>
           <Image
             style = {styles.iconSearch}
             resizeMode = {'center'}
             source = {require('../../img/imgSearch.png')}
           />
         </View>
      </View>
      );
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  search : {
    margin : 5,
    marginTop : 10,
    height : height /14,
    backgroundColor : 'white',
    flexDirection : 'row'
  },
  textInput : {
    backgroundColor : 'white',
    flex : 9,
    textAlign: 'center',
  },
  containerSearch : {
    height : height /14, width : height /14,
    justifyContent : 'center', alignItems : 'center',
    flex : 1
  },
  iconSearch : {
    flex : 1
  }
});
