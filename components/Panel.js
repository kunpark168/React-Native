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
      isExpanded: true,
      animation: new Animated.Value()
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
            <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
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
    backgroundColor:'darkblue',
    overflow:'hidden',
    marginBottom:20
  },
  titleContainer:{
    flexDirection:'row'
  },

  title:{
    flex : 1,
    padding: 10,
    color: '#fff',
    fontWeight:'bold'
  },

  button:{},
  buttonImage:{
    width: 30,
    height:25
  },
  body:{
    padding:10,
    paddingBottom:0,
    backgroundColor:'black'
  }
});
export default Panel;
