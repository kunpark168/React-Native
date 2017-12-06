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
      listSession: props.listSession,
    }
    console.log("state: "+this.state.listCinema);
    console.log("title: "+this.state.title);
    console.log("listSess: "+this.state.listSession);
    this.reload = this.reload.bind(this);
  }
  componentWillReceiveProps(nextProps){
    // if(nextProps.reload != this.state.reload){
    //   this.setState({
    //     isExpanded: !this.state.isExpanded,
    //   });
    //   this.toggle();
    // }
  }
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
  reload(){
    this.setState({
      reload: !this.state.reload,
    })
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
            </View>
          </TouchableOpacity>
          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            {/* {this.props.children} */}
            {this.props.listCinema.map((result, key)=>{
              return(
                <View style={styles.sessionView} key={result.id}>
                  <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)} horizontal={true}>
                    <Text style={styles.nameText}>{result.name}</Text>
                    <Image style={styles.iconLocation}
                      resizeMode = {'center'}
                      source = {require('../../img/icon_location.png')}/>
                  </View>
                  <FlatList
                    data={result.listSession}
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
