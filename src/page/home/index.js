import {
  View
} from "react-native";
import React, { Component } from "react";

import Head from '../../components/head'
// import Editor from '../../components/editor'

export default class Home extends Component {
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
  // componentWillMount() {
  //   console.log('--------componentWillMount')
  //   // this.fetchData()
  // }

  // async function fetchRequest(params){
  //   let body = convertBody(params);
  //   return new Promise((resolve, reject) => {
  //       fetch(convertUrl(baseUrl, params),{
  //           method: method,
  //           headers: headers,
  //           body: body
  //       })
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //           resolve(responseJson);
  //       })
  //       .catch((error) => {
  //           if (ApiModule.isDebug) {
  //               console.error("request error: " + error);
  //           };
  //           reject(error);
  //       });
  //   });
  // }
  // fetchData() { 
  //   return fetch("https://www.apiopen.top/novelSearchApi?name=", {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then((responseJson) => {      
  //     return responseJson.json()
  //   }).then((responseJson) => {
  //     console.log(responseJson)
  //     return responseJson
  //   }).catch((error) => { 
  //     console.error(error)
  //   })
  // }
  render() {
    // this.fetchData()
    return (     
      <View>    
        <Head {...this.props} config={this.state.headConfig} />
      </View>      
    )
  }  
}