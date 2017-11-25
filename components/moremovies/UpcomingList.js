import React, {Component} from 'react';
import Panel from './Panel';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker,
  Alert,
  ActivityIndicator,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import {
 StackNavigator,
} from 'react-navigation';

export default class MovieDetail extends Component<{}> {
  static navigationOptions = {
    header : null,
  };
  constructor(props){
  }
  componentDidMount(){
    const {params} = this.props.navigation.state;
    let JSONOBJECT = JSON.parse(`{"param": {"url": "/film/detail?film_id=${params.fiml_id}", "keyCache": "movie-detail${params.fiml_id}"}, "method": "GET"}`);
      fetch('http://www.123phim.vn/apitomapp',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(JSONOBJECT)
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        //console.log(responseJson);
        console.disableYellowBox = true;
        //let data = JSON.parse(JSON.stringify(responseJson.result));
        this.setState({
          isLoading: false,
          returnData: responseJson.result,
        });
        if (this.state.returnData != null){
          let arrCategory = this.state.returnData.film_category.split (",");
          let arrGenreFlag = [];
          for (let i=0; i<arrCategory.length; i++){
             let ob = {genreName : arrCategory[i]};
             arrGenreFlag[i] = ob;
          }
          this.setState ({
            arrGenre : arrGenreFlag
          });
          youtube_id = this.state.returnData;
          console.log(this.state.returnData);
        }
      })
      .catch((error)=>{
        console.error(error);
      });
      //console.log(this.getStartEndDate());
      let JSONSESSION = JSON.parse(`{"param": {"url": "/session/list?cinema_id=-1&film_id=${params.fiml_id}&start_date=${this.getStartEndDate()[0]}&end_date=${this.getStartEndDate()[1]}&location_id=1", "keyCache": "no-cache"}, "method": "GET"}`);
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
          isLoading2: false,
          returnData2: responseJson.result,
        });
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
          isLoading3: false,
          returnData3: responseJson.result,
        });
      })
      .catch((error)=>{
        console.error(error);
      })
  }
  render() {
    return (
      <ScrollView style = {styles.container}>

      </ScrollView>
    );
  }
}

const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#221e40'
  },
});
