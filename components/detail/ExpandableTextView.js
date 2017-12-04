import React, {Component} from 'react';
import ViewMoreText from 'react-native-view-more-text';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ExpandableTextView extends Component<{}> {
  constructor(props) {
    super(props);
    this.renderViewMore = this.renderViewMore.bind(this);
    this.renderViewLess = this.renderViewLess.bind(this);
  }
  renderViewMore(onPress){
    return(
      <Text style={styles.textExpand} onPress={onPress}>Xem thêm</Text>
    )
  }
  renderViewLess(onPress){
    return(
      <Text style={styles.textExpand} onPress={onPress}>Thu gọn</Text>
    )
  }
  render(){
    return(
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        textStyle={styles.textContent}>
        <Text >
          {this.props.content}
        </Text>
      </ViewMoreText>
    )
  }
}
const styles = StyleSheet.create({
  textExpand:{
    fontSize: 13,
    color: 'red',
    textAlign:'right',
    fontStyle : 'italic',
    marginRight: 10,
    marginBottom: 10,
  },
  textContent:{
    fontSize : 15,
    color: 'white',
    textAlign: 'left',
    padding: 10,
  }

});
