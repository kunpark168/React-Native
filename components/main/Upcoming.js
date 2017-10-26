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
export default class Upcoming extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      arrMovies1 : [],
      arrMovies2 : [],
      arrMovies3 : [],
    };
  }
  render() {
      return (
      <View style = {styles.containerOnAirMovies}>
              <FlatList
                    style = {{flex : 1}}
                    data={this.state.arrMovies1}
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
                  horizontal
                    />
              <FlatList
                    style = {{flex : 1}}
                    data={this.state.arrMovies2}
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
                  horizontal
                    />
                <FlatList
                          style = {{flex : 1}}
                          data={this.state.arrMovies3}
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
                        horizontal
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
      body: JSON.stringify({"param": {"url": "/film/list?status=1", "keyCache": "main-films-coming"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
       let arrFlag = responseJson.result;
       let arrMoviesFlag1 = [];
       let arrMoviesFlag2 = [];
       let arrMoviesFlag3 = [];
      for (let i = 0; i< arrFlag.length ; i++){
        let ob = {key : i, poster_thumb : arrFlag[i].poster_thumb, film_id : arrFlag[i].film_id};
          if (i<14){
            arrMoviesFlag1 [i] = ob;
          }else if (i>13 && i< 28){
              arrMoviesFlag2 [i-14] = ob;
          }else if (i>27){
              arrMoviesFlag3 [i-28] = ob;
          }
    }
      this.setState({
        arrMovies1 : arrMoviesFlag1,
        arrMovies2 : arrMoviesFlag2,
        arrMovies3 : arrMoviesFlag3,
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
