import React,{Component} from 'react';
import PanelSmall from './PanelSmall';
import{
  StyleSheet,Text,View,Image,TouchableOpacity,Animated,Dimensions,FlatList,
}from 'react-native';

class Panel extends Component{
  constructor(props){
    super(props);
    this.icons={
      'right':require('../../img/arrowRight.png'),
      'down':require('../../img/arrowDown.png')
    }
    this.state={
      title: props.title,
      icon: props.icon,
      isExpanded: true,
      animation: new Animated.Value(),
      reload: false,
      offset:0,
      listCinema: props.listCinema,
      listSessions: props.listSession,
    }
    console.log("state: "+this.state.listCinema);
    console.log("title: "+this.state.title);
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.reload !== this.state.reload) {
  //     this.setState({ reload: nextProps.reload });
  //     console.log('insides');
  //   }
  //   if(this.state.reload && !this.state.isExpanded){
  //     this.toggle();
  //     this.setState({
  //       reload: false
  //     });
  //     console.log('inside');
  //   }
  // }
  toggle(){
    let initialValue = this.state.isExpanded? this.state.minHeight:this.state.maxHeight+this.state.minHeight,
        finalValue = this.state.isExpanded? this.state.maxHeight + this.state.minHeight:this.state.minHeight;
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
    console.log('expand: '+this.state.isExpanded);
    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
    // console.log("finalValue: "+finalValue);
    // console.log("startValue: "+initialValue);
  }
  _setMaxHeight(event){
    this.setState({
      maxHeight : event.nativeEvent.layout.height
    });
  }
  _setMinHeight(event){
    this.setState({
      minHeight : event.nativeEvent.layout.height,
      animation: new Animated.Value(event.nativeEvent.layout.height),
    });
  }
  getListSessions(data1,data,id, idCine, day){
    var list = [];
    for(let i = 0; i<data.length;i++){
      if(id == data[i].p_cinema_id
        && Number(data[i].session_time.slice(8,10)) == day && idCine == data[i].cinema_id){
        let startTime = this.getTime(data[i].session_time);
        let endTime = "~"+this.calculateEndTime(startTime, Number(data[i].film_duration));
        let version = this.getFilmVersion(data1,data[i]);
        list.push({start: startTime, end: endTime, version: version});
      }
    }
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
    let icon = this.icons['down'];
    if(this.state.isExpanded){
      icon = this.icons['right'];

    }
    return(
      <Animated.View
        style={[styles.container,{height: this.state.animation}]}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.toggle.bind(this)}>
            <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)} horizontal={true}>
              <Image
                style={styles.iconImage}
                source= {{uri: this.state.icon}}></Image>
              <Text style={styles.title}>{this.state.title}</Text>
              <View style={styles.button}>
                <Image
                  style={styles.buttonImage}
                  source={icon}></Image>
              </View>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1">
              </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            {/* {this.props.children} */}
            {this.state.listCinema.map((prop, key)=>{
              return(
                <View style={styles.sessionView} key={prop.id}>
                  <PanelSmall key = {this.props.dataID} title = {prop.name} /*reload={this.state.reload}*/
                    offset={this.state.offset}>
                      <FlatList
                        data={this.getListSessions(this.props.dataDetail,this.props.dataSession,this.props.dataID,prop.id,this.props.dataDay)}
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
                </View>
              );})}
          </View>
        </View>
      </Animated.View>
    )
  }
}
const { height } = Dimensions.get ('window');
const styles= StyleSheet.create({
  container:{
    backgroundColor:'#221e40',
    overflow:'hidden',
    marginBottom:20
  },
  titleContainer:{
    flexDirection:'row',
    paddingBottom:20,
    borderColor: '#5a5960',
    borderBottomWidth: 0.5,
  },

  title:{
    flex : 1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop: 5,
    color: 'white',
    fontSize: 16,
  },

  button:{

  },
  buttonImage:{
    width: 30,
    height:25
  },
  iconImage:{
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  body:{
    padding:10,
    paddingBottom:0
  },
  timeView:{
    flexDirection:'row',
    flex:5,
  },
  itemTimeView:{
    flexDirection: 'row',
    marginBottom:20,
    marginTop:20,
  },
  versionView:{
    flex:4,
    justifyContent:'center',
    color: 'white',
    opacity:0.5,
    marginTop: 10,
  },
  startTimeText:{
    fontSize: 25,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10,
    fontWeight:'bold',
  },
  endTimeText:{
    fontSize: 16,
    color: 'white',
    opacity:0.5,
    marginBottom: 3,
    justifyContent:'center',
    marginTop: 10,
  },
  cinemaName:{
    flexDirection: 'row'
  },
  iconLocation:{
    width: height/25,
    height: height/25,
    alignItems:'flex-end',
    opacity:0.5,
    flex: 1
  },
  iconTicket:{
    width: height/25,
    height: height/25,
    alignItems:'flex-end',
    flex: 1,
    opacity:0.5,
    marginTop:10,
  },
  nameText:{
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10,
    flex: 9
  },
});
export default Panel;
