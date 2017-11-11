import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
 View,
 StyleSheet,
 Dimensions,
 Text,
 TouchableOpacity,
 Image
} from 'react-native';
import {
 StackNavigator,
} from 'react-navigation';
let arrMoviesUpcoming = [{}, {}, {}, {}, {}];
export default class Upcoming extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      arrMovies : []
    };
  }
  render() {
    if (this.state.arrMovies.length > 0){
      for (let i = 0; i<5; i++){
          arrMoviesUpcoming [i] = this.state.arrMovies [i];
      }
    }
      return (
      <View >
               <View style = {{flex : 1, flexDirection : 'row'}}>
                    <TouchableOpacity onPress = {() => {
                           this.props.onPress (arrMoviesUpcoming[0].film_id)
                      }}
                    >
                      <Image
                        style={styles.onAirMovies}
                        source={{uri: arrMoviesUpcoming[0].poster_landscape}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                           this.props.onPress (arrMoviesUpcoming[1].film_id)
                      }}
                    >
                      <Image
                        style={styles.onAirMovies}
                        source={{uri: arrMoviesUpcoming[1].poster_landscape}}
                      />
                    </TouchableOpacity>
               </View>
               <View style = {{flex : 1, flexDirection : 'row'}}>
                    <TouchableOpacity onPress = {() => {
                           this.props.onPress (arrMoviesUpcoming[2].film_id)
                      }}
                    >
                      <Image
                        style={styles.onAirMovies}
                        source={{uri: arrMoviesUpcoming[2].poster_landscape}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                           this.props.onPress (arrMoviesUpcoming[1].film_id)
                      }}
                    >
                      <Image
                        style={styles.onAirMovies}
                        source={{uri: arrMoviesUpcoming[1].poster_landscape}}
                      />
                    </TouchableOpacity>
               </View>

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
       let arrMoviesFlag = [];
      for (let i = 0; i< 5 ; i++){
        let ob = {key : i, poster_landscape : arrFlag[i].poster_landscape, film_id : arrFlag[i].film_id};
        arrMoviesFlag [i] = arrFlag[i];
    }
      this.setState({
        arrMovies : arrMoviesFlag
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
    marginBottom : 10,
    justifyContent : 'space-between'
  },
  onAirMovies : {
    flex : 1, height : 130, width : 165,marginLeft : 10,
    justifyContent : 'space-between', borderWidth : 0.8, borderColor : 'white', marginBottom : 10,
  },
});
