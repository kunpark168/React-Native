import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
export default class MoviesSwiper extends Component<{}> {
  render() {
    return (
           <View style = {styles.carSwiper}>
              <Swiper
                 showsButtons={true}
                 dot = {<View style={style = styles.dot} />}
                 activeDot = {<View style={style = styles.dotActive} />}
                 autoplay = {true}>
                 <View style={{flex: 1}}>
                     <Image
                         style={{flex : 1}}
                         source={{uri : this.props.linkPoster1}}
                     />
                 </View>
                 <View style={{flex: 1}}>
                     <Image
                         style={{flex : 1}}
                         source={{uri : this.props.linkPoster2}}
                     />
                 </View>
                 <View style={{flex: 1}}>
                     <Image
                         style={{flex : 1}}
                         source={{uri : this.props.linkPoster3}}
                     />
                 </View>
                 <View style={{flex: 1}}>
                     <Image
                         style={{flex : 1}}
                         source={{uri : this.props.linkPoster4}}
                     />
                 </View>
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
    marginTop : 5
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
