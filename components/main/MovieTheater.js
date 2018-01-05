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
                    style={{width: 60, height: 60, borderRadius : 50, borderWidth : 1, borderColor : 'white'}}
                    source={{uri: item.cinema_logo}}
                  />
                  </TouchableOpacity>
                </View>
            }
            horizontal = {false}
            numColumns = {4}
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
      let arrFlag = responseJson.result;
      let arrMoviesFlag = [];
      for (let i = 0; i< arrFlag.length ; i++){
        var ob = { key : arrFlag[i].p_cinema_id, cinema_logo : arrFlag[i].cinema_logo };
        if (arrMoviesFlag.length == 0){
          arrMoviesFlag [i] = ob;
        }else {
            let flag = true;
            for (let j = 0; j < arrMoviesFlag.length; j++){
               if (arrFlag[i].p_cinema_id == arrMoviesFlag[j].key){
                  flag = false;
                }
              }
            if (flag == true){
             let index = arrMoviesFlag.length;
             arrMoviesFlag[index] = ob;
            }
        }

      }
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
    justifyContent : 'space-between'
  },
  onAirMovies : {
    flex : 1,
    justifyContent : 'space-between', marginBottom : 15, marginRight : 10,
  }
});
