import {
  View,
  SafeAreaView,
  ScrollView,
  Text
} from "react-native";
import React, { Component } from "react";
import Head from '../../components/head'
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
    this.state = {
      itemView: []
    }
  }
  componentWillMount() { 
    this.renderItem()
  }
  renderItem() { 
    const ItemView = []
    local.get({ key: 'content' }).then(res => {
      console.log('--res', res)
      res.map(item => {
        const key = Object.keys(item)
        ItemView.push(
          <View>
            <View>{key[0]}</View>
            <View>{item[key[0]]}</View>
          </View>
        )
      })
      this.setState({
        itemView: ItemView
      })
    }).catch(err => { 
      console.log(err)
    })
  }
  render() {
    console.log('itemView', this.state.itemView)
    return (
      <SafeAreaView>
        <ScrollView>{this.state.itemView}</ScrollView>
      </SafeAreaView>      
    )
  }
}

export default Home