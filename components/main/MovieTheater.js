import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';
export default class MovieTheater extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      arrTheater : []
    };
  }
  render() {
      return (
      <View style = {styles.containerOnAirMovies}>
        <FlatList
              data={this.state.arrTheater}
              renderItem={({item}) =>
                <View style = {styles.onAirMovies}>
                  <TouchableOpacity>
                  <Image
                    style={{width: 50, height: 50, borderRadius: 50}}
                    source={{uri: item.cinema_logo}}
                  />
                  </TouchableOpacity>
                </View>
            }
            horizontal = {false}
            numColumns = {5}
              />
      </View>
      );
  }
  componentDidMount(){
    return fetch('http://www.123phim.vn/apitomapp',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"param": {"url": "/cinema/list?location_id=1", "keyCache": "main-cinemas1"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson);
      let arrFlag = responseJson.result;
      let arrTheaterFlag = [];
      for (let i = 0; i< arrFlag.length ; i++){
        let ob = {key : i, cinema_logo : arrFlag[i].cinema_logo};
        arrTheaterFlag [i] = ob;
      }
      this.setState({
        arrTheater : arrTheaterFlag,
      },function(){
      });
    })
    .catch((error)=>{
      console.error(error);
    });
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  containerOnAirMovies : {
    marginLeft : 10,
    height : 500, justifyContent : 'space-between'
  },
  onAirMovies : {
    flex : 1,
    justifyContent : 'space-between', marginBottom : 15, marginRight : 10, borderWidth : 0.8, borderColor : 'white'
  }
});
