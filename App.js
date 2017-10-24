import React, {Component} from 'react';
import Panel from './components/Panel'
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
  FlatList
} from 'react-native';

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      isLoading2:true
    }
    this.getDateOfWeek = this.getDateOfWeek.bind(this);
    this.getListCinemas = this.getListCinemas.bind(this);
  }
  componentDidMount(){
      fetch('http://www.123phim.vn/apitomapp',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({"param": {"url": "/film/detail?film_id=1356", "keyCache": "movie-detail1356"}, "method": "GET"})
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
        console.log(responseJson);
        this.setState({
          isLoading2: false,
          returnData2: responseJson.result,
        });
      })
      .catch((error)=>{
        console.error(error);
      });
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

  getListCinemas(id){
    var data = this.state.returnData2;
    var list = [];
    for(let i = 0; i< data.length;i++){
      if(id == data[i].p_cinema_id){
        let tmp = data[i].cinema_name;
        list.push(tmp);
      }
    }
    return list;
  }
  render() {
    if(this.state.isLoading || this.state.isLoading2){
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
                source={require('./image/clock.png')} />
              <Text style = {styles.mediumText}>{this.state.returnData.film_duration} phút</Text>
            </View>

            <Text style = {styles.mediumText}>{this.state.returnData.film_category}</Text>

            <TouchableOpacity style = {styles.trailerButton}
              onPress = {this.watchTrailer}>
              <View style = {styles.horizontalView}>
                <Image style = {styles.playIcon}
                  source={require('./image/play.png')} />
                <Text style = {styles.buttonText}>Trailer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style = {styles.infoText}>{this.state.returnData.film_description_mobile}</Text>

        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
          <FlatList horizontal={true}
            data={this.state.returnData.list_actor}
            renderItem={({item})=>
            <View style = {styles.actorView}>
              <Image style={styles.actorIcon}
                source={{uri: item.avatar}}></Image>
                <Text style={styles.smallText}>{item.artist_name}</Text>
            </View>}>
          </FlatList>
        </ScrollView>

        <View style = {styles.horizontalView}>
          <Picker style = {styles.theatrePicker}
            >
            <Picker.Item label = 'Lotte Cinema' />
            <Picker.Item label = 'Galaxy Cinema' />
            <Picker.Item label = 'BHD Star Cineplex' />
          </Picker>

          <Picker style = {styles.theatrePicker}>
            <Picker.Item label = 'CNS - Quốc Thanh' />
            <Picker.Item label = 'Lotte - Cộng Hòa' />
            <Picker.Item label = 'GLX - Quang Trung' />
          </Picker>
        </View>

        <ScrollView horizontal={true}>
          <FlatList horizontal={true}
            data={this.getDateOfWeek()}
            renderItem={({item})=>
              <View style = {styles.dateView}>
                <Text style = {styles.mediumText}>{item.key}</Text>
                <Text style = {styles.dateText}>{item.day}</Text>
              </View>}></FlatList>
        </ScrollView>

        <ScrollView>
          <Panel title="CineStar" style = {styles.mediumText}>
            <Text style = {styles.smallText}>{this.getListCinemas(16)}</Text>

          </Panel>
          <Panel title="Lotte Cinema" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="BHD Star Cineplex" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="Galaxy Cinema" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="Dong Da Cinema" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="Mega GS" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="CGV" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <Panel title="Cụm rạp khác" style = {styles.mediumText}>
            <Text style = {styles.smallText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </Panel>
          <View style={{padding:10}}></View>
        </ScrollView>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'darkblue'
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
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10
  },

  mediumText: {
    flex: 1,
    fontSize: 16,
    color: 'lime',
    marginBottom: 3,
    marginLeft: 10
  },

  smallText: {
    fontSize: 13,
    color: 'lime'
  },

  clockIcon: {
    width:20,
    height:20
  },

  trailerButton: {
    backgroundColor: 'yellow',
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

  actorIcon: {
    width:50,
    height:50,
    marginBottom: 3,
    borderRadius: 100
  },

  theatrePicker: {
    color: 'red',
    width: 150,
    marginTop: 20,
    marginRight: 20
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

  theatreView: {
    marginTop: 20,
    marginBottom: 20
  },

  theatreName: {
    color: 'fuchsia',
    fontSize: 16,
    fontWeight: 'bold'
  },

  theatrePrice: {
    color: 'red',
    backgroundColor: 'lime',
    fontWeight: 'bold',
    width: 70,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 22,
    marginLeft: 50,
    borderRadius: 50
  }
});
