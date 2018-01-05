import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
 View,
 StyleSheet,
 Dimensions,
 Text,
 TouchableOpacity,
 Image,
 FlatList
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
          <FlatList
                style = {{flex : 1, marginLeft : 7, marginRight : 7, marginBottom : 20}}
                data={this.state.arrMovies}
                renderItem={({item}) =>
                  <View style = {{width: 230, height: 180}}>
                     <View style = {{marginRight : 7, borderColor : 'white', borderWidth : 1}}>
                         <TouchableOpacity onPress = {() => {
                                this.props.onPress (item.film_id) }}>
                             <Image
                               style={{width: 230, height: 140}}
                               source={{uri: item.poster_thumb}}
                             />
                         </TouchableOpacity>
                     </View>
                      <View style={{width: 230, height: 40, marginTop : 2, flexDirection : 'column', marginLeft : 5, justifyContent : 'center'}}>
                         <Text style = {{color : 'white', fontSize : 13, fontWeight : 'bold', height: 20}}>{item.film_name_vn} - {item.film_name_en}</Text>
                         <View style = {{flexDirection : 'row', height : 20}}>
                               <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'center' }}>
                                   <Image style = {styles.clockIcon}
                                     source={require('../../img/iconstar.png')} />
                                   <Image style = {styles.clockIcon}
                                     source={require('../../img/iconstar.png')} />
                                   <Image style = {styles.clockIcon}
                                     source={require('../../img/iconstar.png')} />
                                   <Image style = {styles.clockIcon}
                                     source={require('../../img/iconstar.png')} />
                                   <Image style = {styles.clockIcon}
                                     source={require('../../img/iconnonstar.png')} />
                                   <View style = {{width : 146, alignItems : 'flex-end'}}>
                                       <Text style = {{color : 'white', fontSize : 13}}>{item.publish_date}</Text>
                                   </View>
                               </View>
                         </View>
                      </View>
                  </View>
              }
              horizontal
                />
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
       this.setState({
        arrMovies : responseJson.result
      },function(){
      });
    })
    .catch((error)=>{
      console.error(error);
    });
    console.log(arrMovies);
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  containerOnAirMovies : {
     marginBottom : 10,
  },
  onAirMovies : {
    height : 130, width : 200,marginLeft : 10,
    borderWidth : 0.8, borderColor : 'white', marginBottom : 10,
  },
  clockIcon: {
    width:12,
    height:12
  },
});
