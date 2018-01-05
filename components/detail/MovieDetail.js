import React, {Component} from 'react';
import Panel from './Panel';
import PanelSmall from './PanelSmall';
import MovieSession from './MovieSession';
import ExpandableTextView from './ExpandableTextView';

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
import {
 StackNavigator,
} from 'react-navigation';

export default class MovieDetail extends Component<{}> {
  static navigationOptions = {
    header : null,
  };
  constructor(props){
    super(props);
    this.state={
      arrGenre : [],
      isLoading:true,
      isLoading2:true,
      isLoading3:true,
      id:0,
      cineId:0,
      day: new Date().getDate(),
  }
  }
  componentDidMount(){
    const {params} = this.props.navigation.state;
    this.setState({
      film_id: params.fiml_id
    });
  console.log('film_id1: '+this.state.film_id);

    let JSONOBJECT = JSON.parse(`{"param": {"url": "/film/detail?film_id=${params.fiml_id}", "keyCache": "movie-detail${params.fiml_id}"}, "method": "GET"}`);
      fetch('http://www.123phim.vn/apitomapp',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(JSONOBJECT)
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.disableYellowBox = true;
        this.setState({
          isLoading: false,
          returnData: responseJson.result,
        });
        if (this.state.returnData != null){
          let arrCategory = this.state.returnData.film_category.split (",");
          let arrGenreFlag = [];
          for (let i=0; i<arrCategory.length; i++){
             let ob = {genreName : arrCategory[i]};
             arrGenreFlag[i] = ob;
          }
          this.setState ({
            arrGenre : arrGenreFlag
          });
          youtube_id = this.state.returnData;
        }
      })
      .catch((error)=>{
        console.error(error);
      });

      fetch('http://www.123phim.vn/apitomapp',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"param": {"url": "/cinema/list?location_id=1", "keyCache": "main-cinemas1"}, "method": "GET"})
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading3: false,
          returnData3: responseJson.result,
        });
      })
      .catch((error)=>{
        console.error(error);
      })

  }
   render() {
    if(this.state.isLoading){
      return(
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
                  <Text style={styles.titleMovie}></Text>
                </View>
            </View>

            <View>
              <View style={styles.poster_landscape}>
                 <ActivityIndicator size='large' style={{alignItems : 'center'}}/>
              </View>
            </View>
          </ScrollView>
        );
    }
    return (
        <ScrollView style = {styles.container}>
          <View style = {styles.search}>
              <TouchableOpacity
              onPress = {()=>{this.props.navigation.navigate('Home', {JSON : this.state.returnData})}}>
                  <View style = {styles.containerSearch}>
                    <Image
                      style = {styles.iconSearch}
                      resizeMode = {'center'}
                      source = {require('../../img/imgBack.png')}
                    />
                  </View>
              </TouchableOpacity>

              <View style = {styles.containerTitle}>
                <Text style={styles.titleMovie}>{this.state.returnData.film_name_vn}</Text>
              </View>
          </View>
          <View>
              <Image style = {styles.poster_landscape}
               source={{uri: this.state.returnData.poster_landscape}} />
          </View>
          <View>
            <Text style = {[styles.largeText, {marginTop : 10, marginLeft : 10}]}>{this.state.returnData.film_name_vn} - {this.state.returnData.film_name_en}</Text>
          </View>
          <TouchableOpacity style = {[styles.trailerButton, {marginTop : 7, marginBottom : 7}]}
              onPress = {()=>{this.props.navigation.navigate('Trailer', {JSON : this.state.returnData})}}>
              <View style = {{flexDirection : 'row', justifyContent : 'center'}}>
                <Image style = {styles.playIcon}
                  source={require('../../img/imgPlay.png')} />
                <Text style = {[styles.buttonText, {marginTop : 2}]}>Play Trailer</Text>
              </View>
          </TouchableOpacity>
          <View style = {styles.containerTime}>
                <View style = {{flex : 7, flexDirection : 'row'}}>
                       <View style = {{marginLeft : 10}}>
                            <Text style = {{color : 'white', fontSize : 16}}>Movie Version : </Text>
                       </View>
                       <View>
                            <Text style = {{marginTop : 4, marginLeft : 2, color : 'red', fontSize : 12}}>{this.state.returnData.film_version}</Text>
                       </View>
                </View>
                <View style = {{marginTop : 5, flex : 3, alignItems : 'center', flexDirection : 'row', justifyContent : 'flex-end'}}>
                       <View style = {{justifyContent : 'center', alignItems : 'flex-end', flex : 2.5}}>
                          <Text style = {{fontSize : 13, color : 'white'}}>{this.state.returnData.film_duration} phút</Text>
                       </View>
                       <Image
                        style = {{marginRight : 10, height : height/34, width : height/34, marginLeft : 5}}
                        resizeMode = {'center'}
                        source = {require('../../img/clock.png')}
                       />
                </View>
          </View>
          <View style = {[styles.containerTime, {marginLeft :  10, }]}>
              <View style = {{flex : 3, flexDirection : 'row'}}>
                    <Text style = {{color : 'white', fontSize : 16}}>Country : </Text>
                    <Text style = {{marginTop : 2, marginLeft : 2, color : 'red', fontSize : 14}}>{this.state.returnData.film_country}</Text>
              </View>
          </View>
          <View>
                <View style = {{flexDirection : 'row'}}>
                  <Text style = {{color : 'white', marginLeft : 10, fontSize : 16}}>Rate Count : </Text>
                  <Text style = {{color : 'red', marginLeft : 5, fontSize : 14, marginTop : 2}}>{this.state.returnData.total_rating}</Text>
                </View>
                <View style = {{flexDirection : 'row'}}>
                  <Text style = {{color : 'white', marginLeft : 10, fontSize : 16}}>Age: </Text>
                  <Text style = {{color : 'red', marginLeft : 5, fontSize : 14, marginTop : 2}}>{this.state.returnData.film_age}</Text>
                </View>
                <View style = {{flexDirection : 'row'}}>
                    <Text style = {{flex : 2, fontSize : 16, marginLeft : 10, color : 'white'}}>Genre : </Text>
                    <View style = {{flex : 5, paddingRight : 10}}>
                      <FlatList
                            data={this.state.arrGenre}
                            renderItem={({item}) =>
                              <View style = {styles.containerGenre}>
                                 <Text style = {{color : 'white', fontSize : 13}}>{item.genreName}</Text>
                              </View>}
                            keyExtractor={(item, index) => index}
                            horizontal/>
                   </View>
                   <View style = {{flex : 3, alignItems : 'center', marginRight : 10}}>
                       <View style = {{flexDirection : 'row'}}>
                           <Image style = {styles.clockIcon}
                             source={require('../../img/imgStar.png')} />
                           <Image style = {styles.clockIcon}
                             source={require('../../img/imgStar.png')} />
                           <Image style = {styles.clockIcon}
                             source={require('../../img/imgStar.png')} />
                           <Image style = {styles.clockIcon}
                             source={require('../../img/imgStar.png')} />
                           <Image style = {styles.clockIcon}
                             source={require('../../img/imgStar.png')} />
                       </View>
                       <View>
                           <Text style = {[styles.mediumText, {paddingLeft : 5}]}>{this.state.returnData.avg_point} / 10</Text>
                       </View>
                   </View>
                </View>
          </View>
          <View style = {styles.containerCalendar}>
                <Image
                   style = {{flex : 1}}
                   resizeMode = {'center'}
                   source = {require('../../img/imgCalendar.png')}
                />
                <View style = {{flex : 5, justifyContent : 'center', marginLeft : 3, marginTop : 8}}>
                  <Text style = {styles.textCalendar}>Movie Info</Text>
                </View>
          </View>
          <ExpandableTextView
            style = {styles.infoText}
            content = {this.state.returnData.film_description_mobile}></ExpandableTextView>
          <ScrollView horizontal={true} showsVerticalScrollIndicator={false} style={styles.seperatedView}>
            <FlatList horizontal={true}
              data={this.state.returnData.list_actor}
              renderItem={({item})=>
              <View style = {styles.actorView}>
                <Image style={styles.actorIcon}
                  source={{uri: item.avatar}}></Image>
                  <Text style={styles.textActor}>{item.artist_name}</Text>
              </View>}
              keyExtractor={(item, index) => index}>
            </FlatList>
          </ScrollView>
          <MovieSession filmId={this.state.film_id} dataDetail = {this.state.returnData}></MovieSession>
        </ScrollView>
      );
  }
}

const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#221e40'
  },

  horizontalView: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10
  },

  movieImage: {
    width:130,
    height:170,
    marginTop: 7,
    marginRight: 5,
    marginLeft : 10
  },

  durationView: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 5
  },

  largeText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    color:'white'
  },

  mediumText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10
  },

  smallText: {
    fontSize: 13,
    color: 'white'
  },

  textActor:{
    fontSize: 13,
    color: 'white',
    textAlign:'center',
  },

  clockIcon: {
    width:20,
    height:20
  },

  trailerButton: {
    width: 120,
    height: 40,
    borderRadius : 20,
    borderColor : 'yellow',
    marginLeft: 10,
    justifyContent : 'center',
    borderWidth :1,
    paddingLeft : 10,
    paddingRight : 10,
    alignItems: 'center'
  },

  playIcon: {
    width:15,
    height:15,
    marginTop: 5,
    marginRight: 4
  },

  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight : 'bold'
  },

  infoText: {
    marginLeft : 10,
    marginRight : 10,
    fontSize: 15,
    color: 'white',
    marginBottom: 25
  },

  actorView: {
    width: height/10,
    alignItems: 'center',
    marginRight: 17
  },

  seperatedView:{
    paddingBottom:10,
    borderColor: '#5a5960',
    borderBottomWidth: 0.5,
    marginBottom:10
  },

  actorIcon: {
    width:50,
    height:50,
    marginBottom: 3,
    borderRadius: 100
  },

  dateView: {
    alignItems: 'center',
    width:80
  },
  dateText: {
    flex: 1,
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  sessionView:{
    marginBottom:10,
    borderColor: '#5a5960',
    borderBottomWidth: 0.5
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
    justifyContent : 'center',
    alignItems : 'center',
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
  poster_landscape : {
    height : height/3.5,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 5
  },
  containerTime : {
    flexDirection : 'row',
  },
  btnPlayTrailer : {
    marginTop : 6,
    height : height/20,
    width :  height/7,
    borderColor : 'red',
    borderWidth : 0.8,
    borderRadius : 20
  },
  EnglishTitle : {
    color : "white",
    fontSize : 18,
    fontWeight : "bold"
  },
  containerGenre : {
    borderColor : "orange",
    borderWidth : 0.8,
    marginLeft : 5,
    marginRight : 1,
    borderRadius : 20,
    paddingLeft : 7,
    paddingRight : 7,
    paddingTop : 3,
    paddingBottom : 3,
    marginBottom : 5
  },
  containerCalendar : {
    flexDirection : 'row',
    height : height /15, justifyContent : 'center', alignItems : 'center'
  },
  textCalendar : {
    color : 'white', fontStyle : 'normal', flex : 1, paddingTop : 10
  }
});
