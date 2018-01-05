import Swiper from 'react-native-swiper';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
var arrDay = [];
var corlorStyle;
export default class MoviesSchedule extends Component<{}> {
  constructor(props) {
    super(props);
}
  render() {
          var d = new Date;
          var first = d.getDate() - d.getDay();
          for(let i = 0;i<7;i++){
              let next = first  + i;
              var nextday = (new Date(d.setDate(next))).toString();
              let dayOfWeek = nextday.split (" ")[0];
              let dateOfMonth = nextday.split (" ")[2]
              let day_date  = { key : i, dayOfWeek : dayOfWeek, dateOfMonth : dateOfMonth};
              arrDay[i] = day_date;
            }
            for(let i = 0; i< arrDay.length ; i++){
              if (arrDay[i].dateOfMonth == d.getDate()){
               corlorStyle = (arrDay[i].dateOfMonth == d.getDate())?
               styles.itemDateToday:styles.itemDate;
             }
            }
      return (
      <View style = {styles.listDate}>
        <FlatList
              data={arrDay}
              renderItem={({item}) =>
                <View style = {styles.itemDate}>
                  <TouchableOpacity>
                    <Text style = {{fontSize : 22, color : '#69657D'}}>{item.dateOfMonth}</Text>
                    <View style = {{justifyContent : 'center', alignItems : 'center', marginBottom : 2}}>
                      <Text style = {{fontSize : 12, color : '#69657D'}}>{item.dayOfWeek}</Text>
                    </View>
                  </TouchableOpacity>
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
    marginLeft : 10, marginRight : 10,
    height : height /13.2,
  },
  itemDate : {
    flex : 1, backgroundColor :'#1A1736',
    borderColor : 'white',
    borderWidth : 0.4,
    width : height/13.2,
    justifyContent : 'center', alignItems : 'center'
  },
});
