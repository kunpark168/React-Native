import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import MoviesSwiper from "./MoviesSwiper";
import SearchBox from "./SearchBox";
import MoviesSchedule from "./MoviesSchedule";
import OnAirMovies from "./OnAirMovies";
import Upcoming from "./Upcoming";
import UpcomingList from "./UpcomingList";
import OnAirMovieList from "./OnAirMovieList"
import MovieTheater from "./MovieTheater";
import MovieDetail from "../detail/MovieDetail";
import Trailer from "../detail/Trailer";
import SearchView from "../search/SearchView";
import {
 View,
 StyleSheet,
 Dimensions,
 StatusBar,
 Image,
 Text,
 ScrollView,
 TouchableOpacity,
 BackHandler
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
      isSearch: false,
    isBlur: false
    };
}
onFocus(){
  this.setState({
    isSearch: true
  });
  console.log("is searching");
}
onBlur(){
  this.setState({
    isBlur: true
  });
}
render() {
  if(this.state.isSearch == true){
      return (
        <ScrollView style = {styles.container}>
           <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"/>
           {/* <SearchBox onBlur={()=>this.onBlur()}/> */}
      </ScrollView>
    )
  }
   return (
      <ScrollView style = {styles.container}>
           <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"/>
                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchView')}}>
                    {/* <SearchBox onFocus = {()=>{this.props.navigation.navigate('SearchView')}}/> */}
                    <StatusBar
                          backgroundColor="#231F41"
                          barStyle="light-content"/>
                    <View style = {styles.search}>
                      <Text style={styles.textPlaceHolder}>Search movies</Text>
                      <View style = {styles.containerSearch}>
                        <Image
                          style = {styles.iconSearch}
                          resizeMode = {'center'}
                          source = {require('../../img/imgSearch.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
           <MoviesSwiper />
           <View style = {[styles.containerCalendar, {marginBottom : 7}]}>
               <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                   <Text style = {[styles.textCalendar, {fontWeight : "bold", marginLeft : 7}]}>Movies Schedule</Text>
               </View>
               <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                     <TouchableOpacity
                     onPress = {(id_film)=> {
                       this.props.navigation.navigate('OnAirMovieList', {fiml_id : id_film});
                     } }
                     >
                       <Text style = {[styles.textCalendar, {color : 'red', fontWeight : "bold", textDecorationLine : 'underline'}]}></Text>
                     </TouchableOpacity >
               </View>
           </View>
          <MoviesSchedule />
          <View style = {[styles.containerCalendar, {marginBottom : 7}]}>
              <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {[styles.textCalendar, {fontWeight : "bold", marginLeft : 7}]}>Top Movies</Text>
              </View>
              <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                    <TouchableOpacity
                    onPress = {(id_film)=> {
                      this.props.navigation.navigate('OnAirMovieList', {fiml_id : id_film});
                    } }
                    >
                      <Text style = {[styles.textCalendar, {color : 'red', fontWeight : "bold", textDecorationLine : 'underline'}]}>More</Text>
                    </TouchableOpacity >
              </View>
          </View>
          <OnAirMovies onPress = {(id_film)=> {
            this.props.navigation.navigate('Detail', {fiml_id : id_film});
            console.log("id_film", id_film);
          } }/>
          <View style = {[styles.containerCalendar, {marginBottom : 7}]}>
              <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {[styles.textCalendar, {fontWeight : "bold", marginLeft : 7}]}>Top Upcoming</Text>
              </View>
              <View style = {{flex : 5, justifyContent : 'center', marginRight : 10, marginTop : 8, alignItems : 'flex-end'}}>
                    <TouchableOpacity
                    onPress = {(id_film)=> {
                      this.props.navigation.navigate('UpcomingList', {fiml_id : id_film});
                    } }
                    >
                      <Text style = {[styles.textCalendar, {color : 'red', fontWeight : "bold", textDecorationLine : 'underline'}]}>More</Text>
                    </TouchableOpacity >
              </View>
          </View>
          <Upcoming onPress = {(id_film)=> {
            this.props.navigation.navigate('Detail', {fiml_id : id_film});
            console.log("id_film", id_film);
          }}/>
          <View style = {{justifyContent : 'center', alignItems : 'center', marginBottom : 5}}>
             <Text style = {{color :  "red", fontSize : 13, marginBottom : 5}}>------------&&------------</Text>
          </View>
          <MovieTheater />
           <View style = {{justifyContent : 'center', alignItems : 'center', marginBottom : 5}}>
             <Text style = {{color :  "red", fontSize : 13, marginBottom : 5}}>------------The end------------</Text>
           </View>
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
  Detail : { screen: MovieDetail },
  Trailer: {screen: Trailer},
  SearchView: {screen: SearchView},
  UpcomingList : {screen: UpcomingList},
  OnAirMovieList : {screen : OnAirMovieList}
});
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
   container : {
    flex : 1,
    backgroundColor : '#231F41'
  },
    containerCalendar : {
      flexDirection : 'row',
      height : height /15, justifyContent : 'center', alignItems : 'center'
    },
    textCalendar : {
      color : 'white', flex : 1, paddingTop : 10, fontSize : 15
    },
    search : {
      margin : 5,
      marginTop : 10,
      height : height /14,
      backgroundColor : '#231F41',
      flexDirection : 'row',
      borderColor : 'white', borderWidth : 0.8,
    },
    containerSearch : {
      height : height /14, width : height /14,
      justifyContent : 'center', alignItems : 'center',
      flex : 1
    },
    textPlaceHolder:{
      color: '#69657D',
      flex:1,
      marginTop: height/56,
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      flex:9
    },
    iconSearch : {
      flex : 1
    }
});
export default MainNavigator;
