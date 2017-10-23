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
export default class OnAirMovies extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      arrMovies : []
    };
  }
  render() {
      return (
      <View style = {styles.containerOnAirMovies}>
        <FlatList
              data={this.state.arrMovies}
              renderItem={({item}) =>
                <View style = {styles.onAirMovies}>
                  <TouchableOpacity>
                  <Image
                    style={{width: 120, height: 150}}
                    source={{uri: item.poster_thumb}}
                  />
                  </TouchableOpacity>
                </View>
            }
            horizontal = {false}
            numColumns = {3}
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
      body: JSON.stringify({"param": {"url": "/film/list?status=2", "keyCache": "showing-film"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log("ArrBannerSwiper : " + responseJson);
      let arrFlag = responseJson.result;
      let arrMoviesFlag = [];
      for (let i = 0; i< arrFlag.length ; i++){
        let ob = {key : i, poster_thumb : arrFlag[i].poster_thumb};
        arrMoviesFlag [i] = ob;
      }
      console.log();
      this.setState({
        arrMovies : arrMoviesFlag,
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
