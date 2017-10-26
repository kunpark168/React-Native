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
  Image,
  ListView
} from 'react-native';
export default class UpcomingMovie extends Component<{}> {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource : ds.cloneWithRows(['row 1', 'row 2']),
    };
  }
  render() {
      return (
      <View style = {styles.containerOnAirMovies}>
          <ListView
            horizontal
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style = {styles.onAirMovies}>
                <TouchableOpacity>
                <Image
                  style={{width: 220, height: 150}}
                  source={{uri: rowData.poster_landscape}}
                />
                </TouchableOpacity>
              </View>
            }
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
      let ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>r1 !== r2});
      let arrFlag = responseJson.result ;
      let arrFlagMovies = [];
      for (let i = 0; i< arrFlag.length; i++){
        let ob = {film_id : arrFlag[i].film_id, poster_landscape : arrFlag[i].poster_landscape};
        arrFlagMovies [i] = ob;
      }
      console.log(arrFlagMovies);
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(arrFlagMovies),
      },function(){
        //do something with new state
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
    justifyContent : 'space-between', marginBottom : 15, marginRight : 10, borderWidth : 0.8, borderColor : 'white'
  }
});
