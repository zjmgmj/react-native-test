import React, { Component } from "react";
import { View, TextInput } from "react-native";

class EditContent extends Component { 
  constructor(props) { 
    super(props)
  }
  render() { 
    const headConfig = {
      // leftComponent: { icon: 'menu', color: '#fff' },
      centerComponent: { text: '智恒达', style: { color: '#fff' } },
      rightComponent: { icon: 'add', color: '#fff' }
    }
    return (
      <View>
        <TextInput></TextInput>
      </View>
    )
  }
}