import React, { Component } from 'react';
import SearchBox from "../main/SearchBox";
import LoadingView from "./LoadingView";
import EmptyView from "./EmptyView";
import {
  View, Text, StyleSheet, FlatList, StatusBar,Dimensions, ScrollView, TextInput, Image
} from 'react-native';
import {
 StackNavigator,
} from 'react-navigation';

export default class SearchView extends Component<{}> {
  static navigationOptions = {
    header : null,
  };
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      isLoading2:true,
      isSearch: false,
      search:''
    }
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    fetch('http://www.123phim.vn/apitomapp',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"param": {"url": "/film/list?status=2", "keyCache": "showing-film"}, "method": "GET"})
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        isLoading1: false,
        returnData1: responseJson.result,
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
      body:JSON.stringify({"param": {"url": "/film/list?status=1", "keyCache": "main-films-coming"}, "method": "GET"})
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
  }
  filterData(data1, data2, keyword){
    var list = [];
    console.log(keyword);
    for(let i = 0; i< data1.length; i++){
      let tmp = data1[i].film_name.toLowerCase();
      console.log(tmp.indexOf(keyword.toLowerCase()));
      console.log(data1[i].film_name.toLowerCase());
      if(data1[i].film_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
        list.push({'id': data1[i].film_id, 'name': data1[i].film_name, 'image': data1[i].poster_thumb});
      }
    }
    for(let i = 0; i< data2.length; i++){
      let tmp = data2[i].film_name.toLowerCase();
      console.log(tmp.indexOf(keyword.toLowerCase()));
      console.log(data2[i].film_name.toLowerCase());
      if(data2[i].film_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1){
        list.push({'id': data2[i].film_id, 'name': data2[i].film_name, 'image': data2[i].poster_thumb});
      }
    }
    console.log(list);
    return list;
  }
  onFocus(){
    this.setState({
      isSearch: true,
    });
    console.log('focus');
  }
  onBlur(){
    this.setState({
      isSearch: false,
    });
    console.log('blur');
  }

  render(){
    if(this.state.isLoading1 == true || this.state.isLoading2 == true || this.state.isSearch == true){
      return (
        <ScrollView style={styles.container}>
          <StatusBar
                backgroundColor="#231F41"
                barStyle="light-content"/>
          {/* <SearchBox onFocus = {()=>this.onFocus()}
                    onBlur = {()=>this.onBlur()}/> */}
          <View style = {styles.search}>
            <TextInput
               style={[styles.textInput, {fontFamily: 'aardvarkcafe'}]}
               onChangeText={(search) => this.setState({search: search})}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               returnKeyType = "search"
               placeholder = "Search movies"
               placeholderTextColor= '#69657D'
               underlineColorAndroid = "transparent"
               value={this.state.text}
             />
           <View style = {styles.containerSearch}>
             <Image
               style = {styles.iconSearch}
               resizeMode = {'center'}
               source = {require('../../img/imgSearch.png')}
             />
           </View>
          </View>
          <LoadingView style = {styles.container}/>
        </ScrollView>
      );
    }
    if(this.filterData(this.state.returnData1, this.state.returnData2, this.state.search).length == 0
    && this.state.isSearch == false
    && (this.state.isLoading1 == false && this.state.isLoading2 == false))
    {
      return (
        <ScrollView style={styles.container}>
          <StatusBar
                backgroundColor="#231F41"
                barStyle="light-content"/>
          {/* <SearchBox onFocus = {()=>this.onFocus()}
                    onBlur = {()=>this.onBlur()}/> */}
          <View style = {styles.search}>
            <TextInput
               style={[styles.textInput, {fontFamily: 'aardvarkcafe'}]}
               onChangeText={(search) => this.setState({search: search})}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               returnKeyType = "search"
               placeholder = "Search movies"
               placeholderTextColor= '#69657D'
               underlineColorAndroid = "transparent"
               value={this.state.text}
             />
           <View style = {styles.containerSearch}>
             <Image
               style = {styles.iconSearch}
               resizeMode = {'center'}
               source = {require('../../img/imgSearch.png')}
             />
           </View>
          </View>
          <EmptyView style = {styles.container}/>
        </ScrollView>
      );
    }
    return(
      <ScrollView style={styles.container}>
        <StatusBar
              backgroundColor="#231F41"
              barStyle="light-content"/>
        <View style = {styles.search}>
          <TextInput
             style={[styles.textInput, {fontFamily: 'aardvarkcafe'}]}
             onChangeText={(search) => this.setState({search: search})}
             onFocus={this.onFocus}
             onBlur={this.onBlur}
             returnKeyType = "search"
             placeholder = "Search movies"
             placeholderTextColor= '#69657D'
             underlineColorAndroid = "transparent"
             value={this.state.text}
           />
         <View style = {styles.containerSearch}>
           <Image
             style = {styles.iconSearch}
             resizeMode = {'center'}
             source = {require('../../img/imgSearch.png')}
           />
         </View>
        </View>

        <FlatList
          data={this.filterData(this.state.returnData1, this.state.returnData2, this.state.search)}
          renderItem={({item})=>
          <View style = {styles.list}>
            <Image style={styles.poster}
              source={{uri: item.image}}></Image>
              <Text style={styles.text}>{item.name}</Text>
          </View>}
          keyExtractor={(item, index) => index}>
        </FlatList>
      </ScrollView>
    );
  }
};
const { height } = Dimensions.get ('window');
const styles = StyleSheet.create({
   container : {
    backgroundColor : '#231F41'},
    text:{
      color: "#ffffff",
      flex: 4,
      marginLeft: 10
    },
    list:{
      padding: 5,
      flexDirection: 'row',
      flex:5
    },
    poster:{
      height: height/10,
      flex: 1,
      borderColor : 'white', borderWidth : 0.8,
    },
    textInput : {
      color : 'white',
      backgroundColor : '#231F41',
      flex : 9,
      textAlign: 'center',
    },
    search : {
      margin : 5,
      marginTop : 10,
      height : height /14,
      backgroundColor : '#231F41',
      flexDirection : 'row',
      borderColor : 'white', borderWidth : 0.8,
    },
    iconSearch : {
      flex : 1
    }
});
