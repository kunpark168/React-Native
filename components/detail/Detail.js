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
  Animated
} from 'react-native';

export default class MovieDetail extends Component<{}> {
  static navigationOptions = {
    header : null,
  };
  constructor(props){
    super(props);
    this.state={
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
        <View style = {styles.horizontalView}>
          <Image style = {styles.movieImage}
            source={{uri: this.state.returnData.poster}} />
          <View>
            <Text style = {styles.largeText}>{this.state.returnData.film_name_vn}</Text>
            <Text style = {styles.mediumText}>{this.state.returnData.film_name_en}</Text>

            <View style = {styles.durationView}>
              <Image style = {styles.clockIcon}
                source={require('../../img/clock.png')} />
              <Text style = {styles.mediumText}>{this.state.returnData.film_duration} phút</Text>
            </View>

            <Text style = {styles.mediumText}>{this.state.returnData.film_category}</Text>

            <TouchableOpacity style = {styles.trailerButton}
              onPress = {this.watchTrailer}>
              <View style = {styles.horizontalView}>
                <Image style = {styles.playIcon}
                  source={require('../../img/play.png')} />
                <Text style = {styles.buttonText}>Trailer</Text>
              </View>
            </TouchableOpacity>
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


const styles = StyleSheet.create({

  container: {
    padding: 18,
    backgroundColor: '#221e40'
  },

  horizontalView: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10
  },

  movieImage: {
    width:115,
    height:150,
    marginTop: 7,
    marginRight: 5
  },

  durationView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  },

  largeText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
    backgroundColor: '#f26697',
    width: 80,
    height: 35,
    paddingTop: 15,
    marginTop: 9,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  playIcon: {
    width:12,
    height:15,
    marginTop: 5,
    marginRight: 4
  },

  buttonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },

  infoText: {
    fontSize: 16,
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
  }
});
