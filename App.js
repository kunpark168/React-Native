import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native';


export default class App extends Component<{}> {

  constructor(props){
    super(props);
  }


  render() {
    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.horizontalView}>
          <Image style = {styles.movieImage}
            source={require('./image/movie.jpg')} />

          <View>
            <Text style = {styles.largeText}>Cương Thi Tái Thế</Text>
            <Text style = {styles.mediumText}>The Vampire Returns</Text>

            <View style = {styles.durationView}>
              <Image style = {styles.clockIcon}
                source={require('./image/clock.png')} />
              <Text style = {styles.mediumText}>120 phút</Text>
            </View>

            <Text style = {styles.mediumText}>Thể loại : Kinh dị, Tình cảm</Text>

            <TouchableOpacity style = {styles.trailerButton}
              onPress = {this.watchTrailer}>
              <View style = {styles.horizontalView}>
                <Image style = {styles.playIcon}
                  source={require('./image/play.png')} />
                <Text style = {styles.buttonText}>Trailer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style = {styles.infoText}>Phim dự kiến sẽ được lên sóng vào tháng 9 này trên kênh SCTV9, chúc các bạn xem phim vui vẻ.</Text>
      
        <ScrollView horizontal={true}>
          <View style = {styles.actorView}>
            <Image style = {styles.actorIcon}
              source={require('./image/actor.jpg')} />
            <Text style = {styles.smallText}>Tiểu Hào</Text>
          </View>

          <View style = {styles.actorView}>
            <Image style = {styles.actorIcon}
              source={require('./image/actress.jpg')} />
            <Text style = {styles.smallText}>Tú Văn</Text>
          </View>

          <View style = {styles.actorView}>
            <Image style = {styles.actorIcon}
              source={require('./image/actor.jpg')} />
            <Text style = {styles.smallText}>Tiểu Hào</Text>
          </View>

          <View style = {styles.actorView}>
            <Image style = {styles.actorIcon}
              source={require('./image/actress.jpg')} />
            <Text style = {styles.smallText}>Tú Văn</Text>
          </View>

          <View style = {styles.actorView}>
            <Image style = {styles.actorIcon}
              source={require('./image/actor.jpg')} />
            <Text style = {styles.smallText}>Tiểu Hào</Text>
          </View>
        </ScrollView>

        <View style = {styles.horizontalView}>
          <Picker style = {styles.theatrePicker}
            >
            <Picker.Item label = 'Lotte Cinema' />
            <Picker.Item label = 'Galaxy Cinema' />
            <Picker.Item label = 'BHD Star Cineplex' />
          </Picker>

          <Picker style = {styles.theatrePicker}>
            <Picker.Item label = 'CNS - Quốc Thanh' />
            <Picker.Item label = 'Lotte - Cộng Hòa' />
            <Picker.Item label = 'GLX - Quang Trung' />
          </Picker>
        </View>

        <ScrollView horizontal={true}>
          <Text style = {styles.dateView}>10</Text>
          <Text style = {styles.dateView}>11</Text>
          <Text style = {styles.dateView}>12</Text>
          <Text style = {styles.dateView}>13</Text>
          <Text style = {styles.dateView}>14</Text>
          <Text style = {styles.dateView}>15</Text>
          <Text style = {styles.dateView}>16</Text>
          <Text style = {styles.dateView}>17</Text>
          <Text style = {styles.dateView}>18</Text>
          <Text style = {styles.dateView}>19</Text>
          <Text style = {styles.dateView}>20</Text>
        </ScrollView>

        <View style = {styles.theatreView}>
          <View style = {styles.horizontalView}>
            <Text style = {styles.theatreName}>Vincom</Text>
            <Text style = {styles.theatrePrice}>15K</Text>
          </View>

          <View style = {styles.horizontalView}>
            <Text style = {styles.theatreName}>Quận 1</Text>
            <Text style = {styles.theatrePrice}>15K</Text>
          </View>

          <View style = {styles.horizontalView}>
            <Text style = {styles.theatreName}>Lotte</Text>
            <Text style = {styles.theatrePrice}>15K</Text>
          </View>

          <View style = {styles.horizontalView}>
            <Text style = {styles.theatreName}>Cinema</Text>
            <Text style = {styles.theatrePrice}>15K</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'darkblue'
  },

  horizontalView: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 10
  },

  movieImage: {
    width:120, 
    height:149,
    marginTop: 7,
    marginRight: 5
  },

  durationView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  },

  largeText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10
  },

  mediumText: {
    fontSize: 16,
    color: 'lime',
    marginBottom: 3,
    marginLeft: 10
  },

  smallText: {
    fontSize: 13,
    color: 'lime'
  },

  clockIcon: {
    width:20, 
    height:20
  },

  trailerButton: {
    backgroundColor: 'yellow',
    width: 80,
    height: 35,
    paddingTop: 15,
    marginTop: 9,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  playIcon: {
    width:12, 
    height:15,
    marginTop: 5,
    marginRight: 4
  },

  buttonText: {
    fontSize: 18, 
    color: 'red', 
    fontWeight: 'bold'
  },

  infoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 25
  },

  actorView: {
    alignItems: 'center',
    marginRight: 17
  },

  actorIcon: {
    width:50, 
    height:50,
    marginBottom: 3,
    borderRadius: 100
  },

  theatrePicker: {
    color: 'red',
    width: 150,
    marginTop: 20,
    marginRight: 20
  },

  dateView: {
    color: 'yellow',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 52
  },

  theatreView: {
    marginTop: 20,
    marginBottom: 20
  },

  theatreName: {
    color: 'fuchsia',
    fontSize: 16,
    fontWeight: 'bold'
  },

  theatrePrice: {
    color: 'red',
    backgroundColor: 'lime',
    fontWeight: 'bold',
    width: 70,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 22,
    marginLeft: 50,
    borderRadius: 50
  }
});