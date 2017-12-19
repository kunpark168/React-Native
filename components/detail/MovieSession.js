import React,{Component} from 'react';
import Panel from './Panel';
import PanelSmall from './PanelSmall';
import{
  StyleSheet,Text,View,Image,TouchableOpacity,Dimensions, FlatList, ScrollView,ActivityIndicator,
}from 'react-native';

class MovieSession extends Component{
  constructor(props){
    super(props);
    this.state={
      day: new Date().getDate(),
      filmId: props.filmId,
      isLoading: true,
      isLoading2: true,
      mainCine:[],
    }
    this.getDateOfWeek = this.getDateOfWeek.bind(this);
    this.getStartEndDate = this.getStartEndDate.bind(this);
    this.changeDateFormat = this.changeDateFormat.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.getListCinemas = this.getListCinemas.bind(this);
    this.getMainCinemas = this.getMainCinemas.bind(this);
    this.getListSessions = this.getListSessions.bind(this);
    this.getTime = this.getTime.bind(this);
    this.calculateEndTime = this.calculateEndTime.bind(this);

  }
  componentDidMount(){
    console.log('film_id2: '+this.state.filmId);
    let JSONSESSION = JSON.parse(`{"param": {"url": "/session/list?cinema_id=-1&film_id=${this.state.filmId}&start_date=${this.getStartEndDate()[0]}&end_date=${this.getStartEndDate()[1]}&location_id=1", "keyCache": "no-cache"}, "method": "GET"}`);
    fetch('http://www.123phim.vn/apitomapp',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(JSONSESSION)
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading: false,
        returnData: responseJson.result,
      });
      if(this.state.returnData != undefined || this.state.returnData != null){
        this.getMainCinemas();
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
        isLoading2: false,
        returnData2: responseJson.result,
      });
    })
    .catch((error)=>{
      console.error(error);
    })
  }
  getStartEndDate(){
    let today = new Date();
    let list = [];
    const addDays = (date, days)=>{
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    let day1 = this.changeDateFormat(today.getDate()), month1 = this.changeDateFormat(today.getMonth() + 1), year1 = today.getFullYear();
    let day2 =this.changeDateFormat(addDays(today, 7).getDate()), month2 = this.changeDateFormat(addDays(today, 7).getMonth()+1), year2= addDays(today, 7).getFullYear();

    list.push(year1+"-"+month1+"-"+day1);
    list.push(year2+"-"+month2+"-"+day2);
    return list;
  }
  changeDateFormat(number){
    let result = number;
    if(number < 10){
      result = "0"+number;
    }
    return result;
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
        tmp = {key:'Today', day: addDays(today, i).getDate()};
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
  onChangeDate=(day)=>{
    this.setState({
      day: day,
    });
    this.getMainCinemas();
  }
  getListCinemas(id, day){
    var data = this.state.returnData;
    var list = [], nameList=[];
    for(let i = 0; i<data.length;i++){
      if(id == data[i].p_cinema_id && Number(data[i].session_time.slice(8,10)) == day
      && !nameList.includes(data[i].cinema_name)){
        list.push({name: data[i].cinema_name, mainId: data[i].p_cinema_id,
        listSession: this.getListSessions(data[i].cinema_id)});
        nameList.push(data[i].cinema_name);
      }
    }
    if(list.length == 0){
      list.push({name: "Không có suất chiếu", mainId: '',
      listSession: ''})
    }
    return list;
  }
  getMainCinemas(){
    var data = this.state.returnData2;
    var list = [], nameList = [];
    for(let i = 0; i< data.length;i++){
      if(!nameList.includes(data[i].p_cinema_name))
      {
        //this.getListCinemas(this.state.day);
        list.push({name: data[i].p_cinema_name, id: data[i].p_cinema_id, icon: data[i].cinema_logo,
        listCinema: this.getListCinemas(data[i].p_cinema_id, this.state.day)});
        nameList.push(data[i].p_cinema_name);
      }
    }
    this.setState({
      mainCine: list,
    });
    console.log(this.state.mainCine);
    return list;
  }
  getListSessions(/*id,*/idCine/*, day*/){
    //id: id của cụm rạp
    //idCine: id của riêng từng rạp
    //day: ngày chiếu
    var data = this.state.returnData;
    var data2 = this.state.returnData2;
    var list = [], time=[];
    for(let i = 0; i<data.length;i++){
      if(idCine == data[i].cinema_id && !time.includes(data[i].session_time)
        && this.state.day == Number(data[i].session_time.slice(8,10))){
        // let time = this.getTime(data[i].session_time);
        // let tmp = time +"~"+this.calculateEndTime(time, Number(data[i].film_duration));
        // list.push(tmp);
        let startTime = this.getTime(data[i].session_time);
        let endTime = "~"+this.calculateEndTime(startTime, Number(data[i].film_duration));
        let version = this.getFilmVersion(this.props.dataDetail,data[i]);
        
        for(let j = 0; j < data2.length; j++){
          if(data2[j].cinema_id == data[i].cinema_id){
            list.push({list_price: data2[j].list_price, id: data[i].p_cinema_id, cineId: data[i].cinema_id, start: startTime, end: endTime, version: version});
            time.push(data[i].session_time);
            break;
          }
        }
      }
    }
    this.setState({
      listSession : list,
    });
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
  getFilmVersion(data,data2){
    //var data = this.state.returnData;
    var tmp = "";
    if(data.film_version != ""){
      if(data.film_version.indexOf("2D")>-1){
        tmp = "2D-";
      }else if (data.flim_version.indexOf("3D")>-1){
        tmp = "3D-";
      }
      if(data2.is_voice == 0){
        tmp += "Phụ đề";
      }else if(data2.is_voice == 1){
        tmp += "Lồng tiếng";
      }
    }
    return tmp;
  }

  render(){
    if(this.state.isLoading || this.state.isLoading2){
      return(
        <View style={{padding: 10}}>
          <ActivityIndicator size='large' style={{alignItems : 'center'}}/>
        </View>
      );
    }
    else{
      return(
        <ScrollView style = {styles.container}>
          <ScrollView horizontal={true} style={styles.seperatedView}>
            <FlatList horizontal={true}
              data={this.getDateOfWeek()}
              renderItem={({item})=>
                  <View style = {styles.dateView}>
                    <Text style = {styles.mediumText}>{item.key}</Text>
                    <TouchableOpacity style={styles.dateView} /*ref="onChangeDate"*/
                    onPress={()=>this.onChangeDate(item.day)}>
                    <Text style = {styles.dateText}>{item.day}</Text></TouchableOpacity>
                  </View>}
                keyExtractor={(item, index) => index}></FlatList>
          </ScrollView>
          <View>
            <View style={{paddingTop:5}}/>
             {this.state.mainCine.map((result, key)=>{
              return(
                <Panel key = {result.id} title={result.name} icon={result.icon}
                  dataID = {result.id} dataDay = {this.state.day}
                  listCinema = {result.listCinema}
                  listSession = {result.listCinema.listSession}/>

                  /* {this.getListCinemas(result.id,this.state.day).map((prop, key)=>{
                    return(
                      <View style={styles.sessionView} key={prop.id}>
                        <PanelSmall key = {result.id} title = {prop.name} reload={this.state.reload}
                          offset={this.state.offset}>
                          <FlatList
                            data={this.getListSessions(result.id,prop.id,this.state.day)}
                            renderItem={({item})=>
                            <View style={styles.itemTimeView}>
                              <View style={styles.timeView}>
                                <Text style = {styles.startTimeText}>{item.start}</Text>
                                <Text style = {styles.endTimeText}>{item.end}</Text>
                              </View>
                              <Text style={styles.versionView}>{item.version}</Text>
                              <Image style={styles.iconTicket}
                                resizeMode = {'center'}
                                source = {require('../../img/icon_ticket.png')}
                              />
                            </View>}
                            keyExtractor={(item, index) => index}></FlatList>
                        </PanelSmall>
                        {/* <View style={styles.cinemaName}>
                          <Text style={styles.nameText}>{prop.name}</Text>
                          <Image style={styles.iconLocation}
                            resizeMode = {'center'}
                            source = {require('../../img/icon_location.png')}
                          />
                        </View>
                      </View>
                    );})}*/

               );})}
             <View style={{padding:10}}/>
          </View>
        </ScrollView>

      );
    }

  }
}
const { height } = Dimensions.get ('window');
const styles= StyleSheet.create({
  container: {
    backgroundColor: '#221e40'
  },
  seperatedView:{
    paddingBottom:10,
    borderColor: '#5a5960',
    borderBottomWidth: 0.5,
    marginBottom:10
  },
  dateView: {
    alignItems: 'center',
    width:80
  },
  mediumText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10
  },
  dateText: {
    flex: 1,
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
});
export default MovieSession;
