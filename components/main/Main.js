import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import MoviesSwiper from "./MoviesSwiper";
import SearchBox from "./SearchBox";
import MoviesSchedule from "./MoviesSchedule";
import OnAirMovies from "./OnAirMovies";
import UpcomingMovie from "./UpcomingMovie";
import Upcoming from "./Upcoming";
import MovieTheater from "./MovieTheater";
import MovieDetail from "../movieDetail/MovieDetail"
import {
 View,
 StyleSheet,
 Dimensions,
 StatusBar,
 Image,
 Text,
 ScrollView,
 TouchableOpacity
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
      dataSwiper : [{banner_url : "https://s3img.vcdn.vn/123phim/2017/10/thor-15090658004895.jpg"},
                    {banner_url : "https://s3img.vcdn.vn/123phim/2017/10/trong-tung-nhip-tho-15090705538653.jpg"},
                    {banner_url : "https://s3img.vcdn.vn/123phim/2017/10/little-pony-15090706337422.jpg"},
                    {banner_url : "https://s3img.vcdn.vn/123phim/2017/10/blade-runner-15090790192049.jpg"}],
    };
}
  render() {
   return (
      <ScrollView style = {styles.container}>
           <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"/>
           <SearchBox />
           <MoviesSwiper linkPoster1 = {this.state.dataSwiper[0].banner_url}
                         linkPoster2 = {this.state.dataSwiper[1].banner_url}
                         linkPoster3 = {this.state.dataSwiper[2].banner_url}
                         linkPoster4 = {this.state.dataSwiper[3].banner_url} />
            <View style = {styles.containerCalendar}>
                  <Image
                     style = {{flex : 1, marginLeft : 5, marginTop : 6}}
                     resizeMode = {'center'}
                     source = {require('../../img/imgCalendar.png')}
                  />
                  <View style = {{flex : 9, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                    <Text style = {styles.textCalendar}>Movies Schedule</Text>
                  </View>

            </View>
          <MoviesSchedule />
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 9, marginTop : 6}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar.png')}
                />
                <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>On Air Movies</Text>
                </View>
                <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                  <TouchableOpacity>
                    <Text style = {[styles.textCalendar, {color : 'red', fontStyle : 'italic'}]}>More movies</Text>
                  </TouchableOpacity >
                </View>
          </View>
          <OnAirMovies onPress = {(id_film)=> {
            this.props.navigation.navigate('Detail', {fiml_id : id_film});
            console.log("id_film", id_film);
          } }/>
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 9, marginTop : 6}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar.png')}
                />
                <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>Upcoming Movies</Text>
                </View>
                <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                  <TouchableOpacity>
                    <Text style = {[styles.textCalendar, {color : 'red', fontStyle : 'italic'}]}>More movies</Text>
                  </TouchableOpacity >
                </View>

          </View>
          <Upcoming onPress = {(id_film)=> {
            this.props.navigation.navigate('Detail', {fiml_id : id_film});
            console.log("id_film", id_film);
          } }/>
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1, marginLeft : 9}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar.png')}
                />
                <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>Movie Theaters</Text>
                </View>
                <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                  <TouchableOpacity>
                    <Text style = {[styles.textCalendar, {color : 'red', fontStyle : 'italic'}]}>More movies</Text>
                  </TouchableOpacity >
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
const MainNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Detail : { screen: MovieDetail }
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
      color : 'white', fontStyle : 'normal', flex : 1, paddingTop : 10
    }
});
export default MainNavigator;
