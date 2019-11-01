import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList
} from "react-native";
import React, { Component } from "react";
import Head from '../../components/head'
import { ListItem } from "react-native-elements";
// import Editor from '../../components/editor'

class Home extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      headConfig: {        
        centerComponent: {text: '智恒达', style: { color: '#fff' }},
        rightComponent: {
          icon: 'add', color: '#fff',
          onPress: () => {
            this.props.navigation.navigate('Edit')
          }
        }
      }
    }
  }
  render() {
    return (
      <View>    
        <Head {...this.props} config={this.state.headConfig} />
        <ListView />
      </View>
    )
  }  
}


class ListView extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      itemView: [],
      contentList: []
    }
  }
  // componentWillMount() { 
  //   this.renderItem()
  // }
  componentDidMount() { 
    this.renderItem()
  }

  renderItem() { 
    const ItemView = []
    local.get({ key: 'content' }).then(res => {
      this.setState({
        contentList: res
      })
      // res.map((item, index) => {
      //   const key = Object.keys(item)
      //   ItemView.push(
      //     <ListItem
      //       key={index}
      //       title={key[0]}
      //       subtitle={item[key[0]]}
      //       bottomDivider
      //       chevron
      //     />
      //   )
      // })      
      // this.setState({
      //   itemView: ItemView
      // })
    }).catch(err => { 
      console.log(err)
    })
  }
  render() {
    const keyExtractor = (item, index) => index.toString()
    const itemView = ({ item }) => {
      const key = Object.keys(item)
      return (
        <ListItem
          key={key}
          title={key[0]}
          subtitle={item[key[0]]}
          bottomDivider
          chevron
        />
      )
    }
    return (
      // <View>{this.state.itemView}</View>
      <FlatList
        keyExtractor={keyExtractor}
        data={this.state.contentList}
        renderItem={itemView}
      />
      // <SafeAreaView>
      //   <ScrollView>{this.state.itemView}</ScrollView>
      // </SafeAreaView>      
    )
  }
}

export default Home