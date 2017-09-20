import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList
} from 'react-native';
export default class MoviesSchedule extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  render() {
    return (
      <View style = {styles.listDate}>
        <FlatList
              data={[{key: 'SUN'}, {key: 'MON'}, {key: 'TUS'}, {key: 'WED'}, {key: 'THU'}, {key: 'FRI'}, {key: 'SAT'}]}
              renderItem={({item}) =>
                <View style = {styles.itemDate}>
                    <Text style = {{fontSize : 20, color : '#69657D'}}>30</Text>
                    <Text style = {{fontSize : 10, color : '#69657D'}}>{item.key}</Text>
                </View>
            }
              horizontal
              />
      </View>
      );
  }
}
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  listDate : {
    marginLeft : 10, marginRight : 10, marginTop : 10,
    height : height /12,
  },
  itemDate : {
    flex : 1, backgroundColor :'#1A1736',
    borderColor : 'white',
    borderWidth : 0.4,
    width : height/12,
    justifyContent : 'center', alignItems : 'center'
  },
});
