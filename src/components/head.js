import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

class Head extends Component { 
  // static defaultProps = { 
  // //  test: test
  //   headConfig: {
  //     leftComponent: { icon: 'menu', color: '#fff' },
  //     centerComponent: { text: '智恒达短信监听', style: { color: '#fff' } },
  //     rightComponent: { icon: 'home', color: '#fff' }
  //   }
  // }

  // static propTypes = {
  //   headConfig: PropTypes.object.isRequired
  // }

  constructor(props) {
    super(props)
  }
  render() {
    const headConfig = this.props.config    
    const header = <Header
      leftComponent = {headConfig.leftComponent}
      centerComponent = {headConfig.centerComponent}
      rightComponent = {headConfig.rightComponent}
    />
    return (
      <View>{header}</View>
    )      
   }
}

export default Head