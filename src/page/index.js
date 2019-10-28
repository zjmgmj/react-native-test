import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './home'
import TestScreen from './test'
import EditScreen from './edit'

const StackRouteConfigs = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Test: {
      screen: TestScreen
    },
    Edit: {
      screen: EditScreen
    }
  }, {
    initialRouteName: 'Home',
  }
)

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: '首页'
    }
  },
  Test: {
    screen: TestScreen,
    navigationOptions: {
      tabBarLabel: '测试'
    }
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: {
      tabBarLabel: '新增'
    }
  }
}, {
  initialRouteName: 'Home'
})

const MainComponent = createAppContainer(TabNavigator, StackRouteConfigs)

export default MainComponent