import React, {Component} from 'react';
import Panel from './Panel';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  FlatList,
  Animated,
  Alert,
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
      id:0,
      cineId:0,
      day: new Date().getDate(),
      reload: false
    }
    this.getDateOfWeek = this.getDateOfWeek.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }
  componentDidMount(){
    const {params} = this.props.navigation.state;
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
        //console.log(responseJson);
        console.disableYellowBox = true;
        //let data = JSON.parse(JSON.stringify(responseJson.result));
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
          console.log(this.state.returnData);
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
        body:JSON.stringify({"param": {"url": "/session/list?cinema_id=-1&film_id=1356&start_date=20171024&end_date=20171031&location_id=1", "keyCache": "no-cache"}, "method": "GET"})
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        this.setState({
          isLoading2: false,
          returnData2: responseJson.result,
        });
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

  getDateOfWeek(){
    let today = new Date();
    var weekDates = [];
    let tmp, day = today.getDay() + 1;
    const addDays = (date, days)=>{
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    for(let i =0; i<7;i++){
      if(i == 0){
        tmp = {key:'Hôm nay', day: addDays(today, i).getDate()};
      }else{
        if(day <= 7){
          tmp = {key:'T'+day, day: addDays(today, i).getDate()};
          day++;
        }else{
          day = 2;
          tmp = {key: 'CN', day: addDays(today, i).getDate()};
        }
      }
      weekDates.push(tmp);
    }
    return weekDates;
  }
  getListSessions(id, idCine, day){
    var data = this.state.returnData2;
    var list = [];
    for(let i = 0; i<data.length;i++){
      if(id == data[i].p_cinema_id
        && Number(data[i].session_time.slice(8,10)) == day && idCine == data[i].cinema_id){
        let time = this.getTime(data[i].session_time);
        let tmp = time +"~"+this.calculateEndTime(time, Number(data[i].film_duration));
        list.push(tmp);
      }
    }
    return list;
  }
  getMainCinemas(){
    var data = this.state.returnData3;
    var list = [], nameList = [];
    for(let i = 0; i< data.length;i++){
      if(!nameList.includes(data[i].p_cinema_name))
      {
        list.push({name: data[i].p_cinema_name, id: data[i].p_cinema_id, icon: data[i].cinema_logo});
        nameList.push(data[i].p_cinema_name);
      }
    }
    return list;
  }
  getListCinemas(id, day){
    var data = this.state.returnData2;
    var list = [], nameList=[];
    for(let i = 0; i<data.length;i++){
      if(id == data[i].p_cinema_id && Number(data[i].session_time.slice(8,10)) == day && !nameList.includes(data[i].cinema_name)){
        list.push({name: data[i].cinema_name, id: data[i].cinema_id});
        nameList.push(data[i].cinema_name);
      }
    }
    if(list.length == 0)
      list.push({name: 'Không có suất chiếu', id: ''});
    return list;
  }
  getTime(time){
    let tmp = time.slice(11,16);
    return tmp;
  }
  calculateEndTime(time, duration){
    let hours = Math.floor(duration / 60);
    let mins = duration - hours * 60;
    let timeHours = Number(time.substr(0,2));
    let timeMins = Number(time.substr(4));
    let resultH = hours+timeHours;
    let resultM = mins + timeMins;
    return resultH +":"+resultM;
  }
  onChangeDate=(day)=>{
    this.setState({
      day: day,
      reload: true
    });
  }
  onChangeCinema(id, cineId){
    this.setState({
      id: id,
      cineId: cineId
    })
  }
  render() {
    if(this.state.isLoading || this.state.isLoading2 || this.state.isLoading3){
      return(
        <View style={{flex:1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }
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
            onPress = {()=>{this.props.navigation.navigate('Player', {media_id : this.state.returnData.media_id, film_name_vn : this.state.returnData.film_name_vn, film_name_en : this.state.returnData.film_name_en})}}>
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
                <Text style = {{color : 'red', marginLeft : 5, fontSize : 14, marginTop : 2}}>{this.state.returnData.total_rating}</Text>
              </View>
              <View style = {{flexDirection : 'row'}}>
                  <Text style = {{flex : 2, fontSize : 16, marginLeft : 10, color : 'white'}}>Genre : </Text>
                  <View style = {{flex : 5, paddingRight : 10}}>
                    <FlatList
                          data={this.state.arrGenre}
                          renderItem={({item}) =>
                            <View style = {styles.containerGenre}>
                               <Text style = {{color : 'white', fontSize : 13}}>{item.genreName}</Text>
                            </View>
                        }
                        horizontal
                          />
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
        <Text style = {styles.infoText}>{this.state.returnData.film_description_mobile}</Text>

        <ScrollView horizontal={true} showsVerticalScrollIndicator={false} style={styles.seperatedView}>
          <FlatList horizontal={true}
            data={this.state.returnData.list_actor}
            renderItem={({item})=>
            <View style = {styles.actorView}>
              <Image style={styles.actorIcon}
                source={{uri: item.avatar}}></Image>
                <Text style={styles.smallText}>{item.artist_name}</Text>
            </View>}
            keyExtractor={(item, index) => index}>
          </FlatList>
        </ScrollView>
        <ScrollView horizontal={true} style={styles.seperatedView}>
          <FlatList horizontal={true}
            data={this.getDateOfWeek()}
            renderItem={({item})=>
                <View style = {styles.dateView}>
                  <Text style = {styles.mediumText}>{item.key}</Text>
                  <TouchableOpacity style={styles.dateView}
                    onPress={()=>this.onChangeDate(item.day)}>
                  <Text style = {styles.dateText}>{item.day}</Text></TouchableOpacity>
                </View>
              }
              keyExtractor={(item, index) => index}></FlatList>
        </ScrollView>

        <ScrollView>
          <View style={paddingTop=5}></View>
          {this.getMainCinemas().map((result, key)=>{
            return(
              <Panel key = {result.id} title={result.name} icon={result.icon} reload={this.state.reload}>
                {this.getListCinemas(result.id,this.state.day).map((prop, key)=>{
                  return(
                    <View style={styles.sessionView} key={prop.id}>
                      <Text style={styles.mediumText}>{prop.name}</Text>
                      <FlatList
                        data={this.getListSessions(result.id,prop.id,this.state.day)}
                        renderItem={({item})=>
                        <View>
                          <Text style = {styles.mediumText}>{item}</Text>
                        </View>}
                        keyExtractor={(item, index) => index}></FlatList>
                    </View>
                  );})}
              </Panel>
            );})}
          <View style={{padding:10}}></View>
        </ScrollView>
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

  clockIcon: {
    width:20,
    height:20
  },

  trailerButton: {
    width: 100,
    height: 40,
    borderColor : 'yellow',
    marginLeft: 10,
    justifyContent : 'center',
    borderWidth :1,
    paddingLeft : 2,
    paddingRight : 2,
    alignItems: 'center',
    justifyContent: 'center'
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
  dateTextPressed:{
    flex: 1,
    color: 'red',
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
    justifyContent : 'center', alignItems : 'center',
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
