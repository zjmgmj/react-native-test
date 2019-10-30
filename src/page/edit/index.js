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
  saveContent(res) { 
    let contentList = []
    if (res) contentList = res
    console.log('******contentList', contentList)
    const content = this.refs.textInput._lastNativeText
    const nowDate = XEUtils.toDateString(new Date())
    const obj = {}
    obj[nowDate] = content
    contentList.push(obj)
    local.set({
      key: 'content',
      data: contentList,
      expires: null
    })
  }
  render() {
    const { goBack } = this.props.navigation
    const headConfig = {
      leftComponent: {
        icon: 'arrow-back', color: '#fff', onPress: () => { 
          goBack()
        }
      },      
      rightComponent: {
        icon: 'save', color: '#fff', onPress: () => { 
          this.refs.textInput.blur()
          local.get({ key: 'content' }).then((res) => {
            this.saveContent(res)
          }).catch(err => { 
            console.log('-------err', err)
            this.saveContent()
          })
        }
      }
    }
    const nowTime = XEUtils.toDateString(new Date())
    console.log('nowTime', nowTime)
    return (
      <View>
        <Header {...this.props} config={headConfig}></Header>
        <Text>{nowTime}</Text>
        <View>
          <TextInput ref="textInput" placeholder="这一刻的想法..." onEndEditing={(evt) => { 
            console.log('evt.nativeEvent.text', evt.nativeEvent.text)
            this.setState({
              text: evt.nativeEvent.text
            })
          }}></TextInput>
        </View>
      </View>
    )    
  }
}

export default EditContent