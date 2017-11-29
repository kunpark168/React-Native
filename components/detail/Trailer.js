import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  FlatList,
  Image
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class Trailer extends React.Component {
  state = {
    isReady: false,
    status: null,
    isPlaying: true,
    isLooping: false,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };

  constructor(props){
    super(props);
    this.state={
      trailer_id: this.props.navigation.state.params.JSON.media_id
    }

    this.onChangeTrailer = this.onChangeTrailer.bind(this);
  }

  onChangeTrailer(youtube_id){
    this.setState({trailer_id: youtube_id});
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}>
        

        {
          this.state.containerMounted &&
          <YouTube
            ref={component => {this._youTubeRef = component;}}
            // You must have an API Key for the player to load in Android
            apiKey="YOUR_API_KEY"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={this.state.trailer_id}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={true}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            playsInline={true}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16/9)) },
              styles.player,
            ]}

            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
          />
        }

        <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>{this.props.navigation.state.params.JSON.film_name}</Text>
        
        <View style={{marginTop: '10%'}}>
          <FlatList 
            style={{paddingRight: 10}}
            data={this.props.navigation.state.params.JSON.list_trailer}
            renderItem={({item}) =>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress = {()=>this.onChangeTrailer(item.youtube_id)}>
                  <Image
                    style={{width: 120, height: 80, margin: 10}}
                    source={{uri: item.thumbnail}} >
                    <Text style={{color: 'white', marginTop:'49%', marginLeft:'73%'}}>{(item.duration - (item.duration % 60)) / 60}:{item.duration % 60}</Text>
                  </Image>
                </TouchableOpacity>
                <Text 
                  onPress = {()=>this.onChangeTrailer(item.youtube_id)}
                  style = {{color : 'white', fontSize : 16, marginTop: 7}}>
                    {item.title}
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingLeft: 5,
    paddingRight: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});