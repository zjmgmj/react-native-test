import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import Header from '../../components/head'
class EditContent extends Component { 
  constructor(props) { 
    super(props)
    this.state = {
      text: ''
    }
  }
  saveContent() { 
    console.log('---------save', this.state.text)
    console.log('saveContent', this.refs.textInput._lastNativeText)
    storage.save({
      key: 'test',
      data: {
        content: '-----test---1111'
      },
      expires: null
    }) 
    storage.getAllDataForKey('test').then(tests => { 
      console.log('-----------test', tests)
    })
  }
  render() {
    storage.getAllDataForKey('test').then(tests => { 
      console.log('-----------test', tests)
    })
    const { goBack } = this.props.navigation
    const headConfig = {
      leftComponent: {
        icon: 'back', color: '#fff', onPress: () => { 
          goBack()
        }
      },      
      rightComponent: {
        icon: 'save', color: '#fff', onPress: () => { 
          this.refs.textInput.blur()
          console.log('-------------rightComponent')
          this.saveContent()
        }
      }
    }
    const nowTime = new Date()
    console.log('nowTime', nowTime)
    return (
      <View>
        <Header {...this.props} config={headConfig}></Header>
        {/* <Text>{nowTime}</Text> */}
        <TextInput ref="textInput" placeholder="这一刻的想法..." onEndEditing={(evt) => { 
          this.setState({
            text: evt.nativeEvent.text
          })
        }}></TextInput>        
      </View>
    )    
  }
}

export default EditContent