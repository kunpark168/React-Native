import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker,
  Alert,
  ActivityIndicator,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import MovieTheater from "./MovieTheater";
import {
 StackNavigator,
} from 'react-navigation';

export default class UpcomingList extends Component<{}> {
  static navigationOptions = {
    header : null,
  };
  constructor(props){
    super(props);
    this.state = {
      arrMovies : []
    };
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
      let result = responseJson.result;
      let arrFlag = [];
      if (result.length /2 == 0){
        for (let i = 0; i< result.length; i++){
          arrFlag [i] = result [i];
        }
      }else {
        for (let i = 0; i< result.length - 1; i++){
          arrFlag [i] = result [i];
        }
      }
      this.setState({
        arrMovies : arrFlag
      },function(){
      });
    })
    .catch((error)=>{
      console.error(error);
    });
  }
  render() {
    return (
      <ScrollView style = {styles.container}>
         <View style = {styles.search}>
            <View style = {styles.containerSearch}>
              <Image
                style = {styles.iconSearch}
                resizeMode = {'center'}
                source = {require('../../img/imgBack.png')}
              />
            </View>
            <View style = {styles.containerTitle}>
              <Text style = {styles.titleMovie}>Movie Upcoming</Text>
            </View>
         </View>
         <View style = {{backgroundColor : '#231F41', marginBottom : 20}}>
            <FlatList
                  style = {{backgroundColor : '#231F41', marginLeft : 4}}
                  data={this.state.arrMovies}
                  renderItem={({item}) =>
                  <View>
                    <View>
                        <TouchableOpacity onPress = {() => {
                               this.props.onPress (item.film_id)
                          }}>
                          <Image
                            style={styles.containerGenre}
                            source={{uri: item.poster_thumb}}
                          />
                        </TouchableOpacity>
                    </View>
                    <View style = {{justifyContent : 'center', alignItems : 'center', marginLeft : 15, width : 160, marginTop : 5}}>
                      <Text style = {styles.textFilm}>{item.film_name_vn}
                      </Text>
                    </View>
                    <View style = {{flexDirection : 'row', alignItems : 'center', justifyContent : 'center', width : 160, marginLeft : 15 }}>
                        <View style = {{marginRight : 5, alignItems : 'flex-start'}}>
                            <Text style = {{color : 'white', fontSize : 13}}>{item.avg_point} /10</Text>
                        </View>
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
                    </View>
                  </View>
                }
                numColumns = {2}
                  />
         </View>
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
}

const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221e40'
  },
  containerSearch : {
    height : height /14, width : height /14,
    justifyContent : 'center', alignItems : 'center',
    flex : 1
  },
  containerTitle : {
    justifyContent : 'center', alignItems : 'center',
    flex : 9
  },
  iconSearch : {
    flex : 1
  },
  search : {
    margin : 5,
    marginTop : 10,
    height : height /14,
    backgroundColor : '#231F41',
    flexDirection : 'row',
    borderColor : 'white', borderWidth : 0.8,
  },
  titleMovie : {
    paddingRight : 15,
    color : 'white',
    fontSize : 17,
    justifyContent : 'center', alignItems : 'center',
  },
  clockIcon: {
    width:12,
    height:12
  },
  mediumText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10
  },
  containerGenre : {
    marginTop : 5,
    marginLeft : 5,
    borderColor : "white",
    borderWidth : 1,
    height: 220, width : 165
  },
  textFilm : {
    color : 'white',
    fontSize : 13,
    fontWeight : 'bold',
    height : 17,
    marginRight : 5
  }
});
