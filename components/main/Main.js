import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import MoviesSwiper from "./MoviesSwiper";
import SearchBox from "./SearchBox";
import MoviesSchedule from "./MoviesSchedule";
import OnAirMovies from "./OnAirMovies";
import UpcomingMovies from "./UpcomingMovies";
import MovieTheater from "./MovieTheater";
import MovieDetail from "../movieDetail/MovieDetail"
import {
 View,
 StyleSheet,
 Dimensions,
 StatusBar,
 Image,
 Text,
 ScrollView
} from 'react-native';
import {
 StackNavigator,
} from 'react-navigation';
var urlPoster = [];
class HomeScreen extends Component{
  static navigationOptions = {
    header : null,
  };
  constructor(props) {
    super(props);
     this.state = {
      dataSwiper : [],
    };
  }
  render() {
    if (this.state.dataSwiper.length > 0){
      for (let i =0; i< 5; i++){
        urlPoster[i] = this.state.dataSwiper[i].banner_url;
      }
   }
    return (
      <ScrollView style = {styles.container}>
           <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"/>
           <SearchBox />
           <MoviesSwiper linkPoster1 = {urlPoster[0]}
                         linkPoster2 = {urlPoster[1]}
                         linkPoster3 = {urlPoster[2]}
                         linkPoster4 = {urlPoster[3]} />
            <View style = {styles.containerCalendar}>
                  <Image
                     style = {{flex : 1, marginLeft : 5}}
                     resizeMode = {'center'}
                     source = {require('../../img/imgCalendar2.png')}
                  />
                  <View style = {{flex : 9, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                    <Text style = {styles.textCalendar}>Movies Schedule</Text>
                  </View>

            </View>
          <MoviesSchedule />
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 5}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar2.png')}
                />
                <View style = {{flex : 9, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>On Air Movies</Text>
                </View>

          </View>
          <OnAirMovies />
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 5}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar2.png')}
                />
                <View style = {{flex : 9, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>Upcoming Movies</Text>
                </View>

          </View>
          <UpcomingMovies />
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 5}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar2.png')}
                />
                <View style = {{flex : 9, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>Movie Theaters</Text>
                </View>

          </View>
          <MovieTheater />
      </ScrollView>
  );
  }
  componentDidMount(){
    return fetch('http://www.123phim.vn/apitomapp',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"param": {"url": "/film/banner", "keyCache": "no-cache"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log("ArrBannerSwiper : " + responseJson);
      this.setState({
        dataSwiper : responseJson.result,
      },function(){
      });
    })
    .catch((error)=>{
      console.error(error);
    });
  }
}
export default class Main extends Component<{}> {
  render() {
    return <MainNavigator />;
  }
}
const MainNavigator = StackNavigator({
  Home: { screen: HomeScreen },
});
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
   container : {
    flex : 1,
    backgroundColor : '#231F41'},
    containerCalendar : {
      flexDirection : 'row',
      height : height /15, justifyContent : 'center', alignItems : 'center'
    },
    textCalendar : {
      color : 'white', fontStyle : 'italic'
    }
});
