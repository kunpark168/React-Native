import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
export default class MoviesSwiper extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      isLoading:true
    }
    this.getBannerLinks = this.getBannerLinks.bind(this);
  }
  componentDidMount(){
    fetch('http://www.123phim.vn/apitomapp',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"param": {"url": "/film/banner", "keyCache": "home-banner"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.disableYellowBox = true;
      this.setState({
        isLoading: false,
        returnData: responseJson.result,
      });
    })
    .catch((error)=>{
      console.error(error);
    });
  }
  getBannerLinks(){
    var list = [];
    var data = this.state.returnData;
    for(let i = 0 ; i< data.length; i++){
      list.push(data[i].banner_url);
    }
    return list;
  }
  render() {
    if(this.state.isLoading == true){
      return(
        <View style = {styles.carSwiper}>
          <ActivityIndicator/>
        </View>
      );
    }
    return (
           <View style = {styles.carSwiper}>
              <Swiper
                 showsButtons={true}
                 dot = {<View style={style = styles.dot} />}
                 activeDot = {<View style={style = styles.dotActive} />}
                 autoplay = {true}>
                 {this.getBannerLinks().map((result, key)=>{
                   return(
                     <View style={{flex: 1}} key={key}>
                         <Image
                             style={{flex : 1}}
                             source={{uri : result}}
                         />
                     </View>
                   );
                 })}
              </Swiper>
           </View>
  );
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  carSwiper : {
    height : height/3.5,
    marginLeft : 10,
    marginRight : 10,
    marginTop : 5,
    backgroundColor:'#231F41'
  },
  dot : {
    backgroundColor:'white',
    width: 12, height: 5, marginLeft: 3,
    marginRight: 3,
  },
  dotActive : {
    backgroundColor:'yellow',
    width: 12, height: 5, marginLeft: 3,
    marginRight: 3,
  }
});
