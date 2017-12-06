import React,{Component} from 'react';
import{
  StyleSheet,Text,View,Image,TouchableOpacity,Animated,Dimensions
}from 'react-native';

class PanelSmall extends Component{
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
      offset: 0,
      isClicked: false
    }
    //this.onClicked = this.onClicked.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // if(nextProps.reload !== this.state.reload) {
    //   this.setState({ reload: nextProps.reload });
    //   //console.log('insides');
    // }
    // if(this.state.reload && !this.state.isExpanded){
    //   this.setState({
    //     reload: false
    //   });
    //   //console.log('inside');
    // }
    // //console.log('out: '+this.state.offset);
    // if(this.state.isExpanded){
    //   this.setState({
    //     offset: this.state.maxHeight,
    //   });
    //  console.log('offset: '+this.state.offset);
    //}
  }
  toggle(){
    let initialValue = this.state.isExpanded? this.state.minHeight:this.state.maxHeight+this.state.minHeight,
        finalValue = this.state.isExpanded? this.state.maxHeight + this.state.minHeight:this.state.minHeight;
    console.log("offset fdsfsd: "+this.state.offset);

    this.setState({
      isExpanded: !this.state.isExpanded,
      offset: finalValue,
    });
    //this.props.onClicked(this.state.offset);
    if(this.state.isExpanded == false){
      this.setState({
        isClicked: true
      });
    }

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
      maxHeight : event.nativeEvent.layout.height*5
    });
    //console.log("maxHeight: "+this.state.maxHeight);
  }
  _setMinHeight(event){
    this.setState({
      minHeight : event.nativeEvent.layout.height,
      animation: new Animated.Value(event.nativeEvent.layout.height),
    });
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
              <Text style={styles.nameText}>{this.state.title}</Text>
              <Image style={styles.iconLocation}
                resizeMode = {'center'}
                source = {require('../../img/icon_location.png')}/>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1">
                <Image
                  style={styles.buttonImage}
                  source={icon}></Image>
              </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            {this.props.children}
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
    // borderColor: '#5a5960',
    // borderBottomWidth: 0.5,
  },

  buttonImage:{
    width: 30,
    height:25
  },

  body:{
    padding:10,
    paddingBottom:0
  },
  cinameName:{
    flexDirection: 'row'
  },
  iconLocation:{
    width: height/25,
    height: height/25,
    alignItems:'flex-end',
    opacity:0.5,
    flex:1,
  },
  nameText:{
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
    marginLeft: 10,
    flex:9
  },
});
export default PanelSmall;
