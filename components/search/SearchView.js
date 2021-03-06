import React, { Component } from 'react';
import MovieDetail from "../detail/MovieDetail";
import LoadingView from "./LoadingView";
import EmptyView from "./EmptyView";
import {
  View, Text, StyleSheet, FlatList, StatusBar,Dimensions, ScrollView, TextInput, Image, TouchableOpacity,
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
    this.convertUnicode = this.convertUnicode.bind(this);
    this.convertUnicodeWord = this.convertUnicodeWord.bind(this);
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
    console.log(this.convertUnicodeWord(keyword));
    for(let i = 0; i< data1.length; i++){
      let name = this.convertUnicode(data1[i].film_name);
      console.log(name.indexOf(keyword));
      console.log(name);
      if(name.indexOf(keyword) > -1){
        list.push({'id': data1[i].film_id, 'name': data1[i].film_name, 'image': data1[i].poster_thumb});
      }
    }
    for(let i = 0; i< data2.length; i++){
      let name = this.convertUnicode(data2[i].film_name);
      console.log(name.indexOf(keyword));
      console.log(name);
      if(name.indexOf(keyword) > -1){
        list.push({'id': data2[i].film_id, 'name': data2[i].film_name, 'image': data2[i].poster_thumb});
      }
    }
    console.log(list);
    return list;
  }
  convertUnicode(data){
    var str = data;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    return str;
  }
  convertUnicodeWord(data){
    var str = data;
    console.log("hihi "+str);
    str.replace("ữ", "a");
    console.log("hihihi" +str);

    // if(str.indexOf(" "))
    //   str.replace(" ", "u");
    return str;
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
          <TouchableOpacity onPress={()=>
              {this.props.navigation.navigate('Detail',{fiml_id:item.id})}}>
              <View style = {styles.list}>
                <Image style={styles.poster}
                       source={{uri: item.image}}></Image>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>}
          keyExtractor={(item, index) => index}>
        </FlatList>
      </ScrollView>
    );
  }
};
const { height } = Dimensions.get ('window');
const MainNavigator = StackNavigator({
  SearchView: {screen: SearchView},
  Detail : { screen: MovieDetail },
});
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
