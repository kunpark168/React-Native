import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import MoviesSwiper from "./MoviesSwiper";
import SearchBox from "./SearchBox";
import MoviesSchedule from "./MoviesSchedule";
import MovieDetail from "../movieDetail/MovieDetail"
import {
 View,
 StyleSheet,
 Dimensions,
 StatusBar,
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
      dataSwiper : []
    };
  }
  render() {
    if (this.state.dataSwiper.length > 0){
      for (let i =0; i< 5; i++){
        urlPoster[i] = this.state.dataSwiper[i].poster_landscape;
      }
        console.log(urlPoster);
     }
    return (
      <View style = {styles.container}>
           <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"/>
           <SearchBox />
           <MoviesSwiper linkPoster1 = {urlPoster[0]}
                         linkPoster2 = {urlPoster[1]}
                         linkPoster3 = {urlPoster[2]}
                         linkPoster4 = {urlPoster[3]} />
          <MoviesSchedule />
      </View>
  );
  }
  componentDidMount() {
      fetch('https://api.mlab.com/api/1/databases/movie_api/collections/showing-film?apiKey=itnBKhN562ouCkIzbhf8F-at08tWfKjQ')
      .then((response)=>response.json())
      .then((responseJson)=> {
        this.setState ({
          dataSwiper : responseJson[0].result
        });
    })
      .catch ((error)=> {
        console.log(error);
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
    backgroundColor : '#231F41'}
});
