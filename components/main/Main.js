import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TextInput,
  Image,
  FlatList
} from 'react-native';
export default class Main extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dataSwiper : []
    };
  }
  render() {
    return (
      <View style = {styles.container}>
              <StatusBar
                 backgroundColor="#231F41"
                 barStyle="light-content"
              />
           <View style = {styles.search}>
               <TextInput
                  style={[styles.textInput, {fontFamily: 'aardvarkcafe'}]}
                  onChangeText={(search) => this.setState({search})}
                  placeholder = "Search movies"
                  underlineColorAndroid = "transparent"
                  value={this.state.text}
                />
              <View style = {styles.containerSearch}>
                <Image
                  style = {styles.iconSearch}
                  resizeMode = {'center'}
                  source = {require('../../img/imgSearch.png')}
                />
              </View>
           </View>
           <View style = {styles.carSwiper}>
               <Swiper
                   dot = {<View style={style = styles.dot} />}
                   activeDot = {<View style={style = styles.dotActive} />}
                   autoplay = {true}
                   style={styles.wrapper}
                   showsButtons={true}>
                  <View style={{flex : 1}}>
                    <Image
                        style={{flex : 1}}
                        source={{uri: 'https://s3img.vcdn.vn/123phim/2017/10/sieu-bao-dia-cau-geostorm-c13-15076306384902.jpg'}}
                    />
                  </View>
              </Swiper>
           </View>
           <View style = {styles.listDate}>
              <FlatList
                    data={[{key: 'SUN'}, {key: 'MON'}, {key: 'TUS'}, {key: 'WED'}, {key: 'THU'}, {key: 'FRI'}, {key: 'SAT'}]}
                    renderItem={({item}) =>
                      <View style = {styles.itemDate}>
                          <Text style = {{fontSize : 20, color : '#69657D'}}>30</Text>
                          <Text style = {{fontSize : 10, color : '#69657D'}}>{item.key}</Text>
                      </View>
                  }
                    horizontal
                    />
           </View>
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
        console.log(this.state.dataSwiper);
      })
      .catch ((error)=> {
        console.log(error);
      });
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  wrapper : {

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  search : {
    margin : 5,
    marginTop : 10,
    height : height /14,
    backgroundColor : 'white',
    flexDirection : 'row'
  },
  carSwiper : {
    height : height/3.5,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 5
  },
  container : {
    flex : 1,
    backgroundColor : '#231F41'
  },
  textInput : {
    backgroundColor : 'white',
    flex : 9,
    textAlign: 'center',
  },
  containerSearch : {
    height : height /14, width : height /14,
    justifyContent : 'center', alignItems : 'center',
    flex : 1
  },
  iconSearch : {
    flex : 1
  },
  dot : {
    backgroundColor:'white',
    width: 12, height: 5, marginLeft: 3,
    marginRight: 3,
  },
  dotActive : {
    backgroundColor:'yellow',
    width: 12, height: 5, marginLeft: 3,
    marginRight: 3,
  },
  listDate : {
    marginLeft : 10, marginRight : 10, marginTop : 10,
    height : height /12,
  },
  itemDate : {
    flex : 1, backgroundColor :'#1A1736',
    borderColor : 'white',
    borderWidth : 0.4,
    width : height/12,
    justifyContent : 'center', alignItems : 'center'
  }
});
