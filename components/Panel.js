import React,{Component} from 'react';
import{
  StyleSheet,Text,View,Image,TouchableOpacity,Animated
}from 'react-native';

class Panel extends Component{
  constructor(props){
    super(props);
    this.icons={
      'right':require('../image/arrowRight.png'),
      'down':require('../image/arrowDown.png')
    }
    this.state={
      title: props.title,
      icon: props.icon,
      isExpanded: true,
      animation: new Animated.Value(),
      reload: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.reload !== this.state.reload) {
      this.setState({ reload: nextProps.reload });
    }
    if(this.state.reload && !this.state.isExpanded){
      this.toggle();
      this.setState({
        reload: false
      });
      console.log('inside');
    }
  }
  toggle(){
    let initialValue = this.state.isExpanded? this.state.minHeight:this.state.maxHeight+this.state.minHeight,
        finalValue = this.state.isExpanded? this.state.maxHeight + this.state.minHeight:this.state.minHeight;
    this.setState({
      isExpanded: !this.state.isExpanded
    });
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
              <TouchableOpacity
                style={styles.button}
                onPress={this.toggle.bind(this)}
                underlayColor="#f1f1f1">
                <Image
                  style={styles.buttonImage}
                  source={icon}></Image>
              </TouchableOpacity>
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
    color: 'white'
  },

  button:{

  },
  buttonImage:{
    width: 30,
    height:25
  },
  iconImage:{
    width: 30,
    height: 30
  },
  body:{
    padding:10,
    paddingBottom:0
  }
});
export default Panel;
