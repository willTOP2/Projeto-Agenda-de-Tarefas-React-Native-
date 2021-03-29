/* eslint-disable prettier/prettier */
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import  { createDrawerNavigator} from 'react-navigation-drawer'




import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

import Menu from './screens/Menu'
import commonStyles from './commonStyles'
import AuthOrApp from './screens/AuthOrApp'
import Icon from 'react-native-vector-icons/FontAwesome'

const menuConfig = {

  initialRouteName: 'Today', 
  contentComponent: Menu, 
  contentOptions: {
      labelStyle: {

        fontFamily: commonStyles.fontFamily, 
        fontWeigth: 'normal', 
        fontSize: 20

      }, 

      activeLabelStyle: {

    color: '#080', 
    fontWeigth: 'bold',


      }
  }

}



const menuRoutes = {

 Today: {

    name: 'Today',
    screen: props =>  <TaskList  title= 'Hoje' daysAhead ={0} {...props}   />, 
    navigationOptions: {
        title: 'Hoje'
    }, 
  
 },

 


 Tomorrow: {

    name: 'Tomorrow',
    screen: props => <TaskList title= 'Amanhã' daysAhead ={1} {...props} />,
    navigationOptions: {
        title: 'Amanhã'
    }
 },


 Week: {

    name: 'Week',
    screen: props => <TaskList title= 'Semana' daysAhead ={7} {...props} />,
    navigationOptions: {
        title: 'Semana'
    }
 },

 Month: {

    name: 'Month',
    screen: props => <TaskList title= ' Mês' daysAhead ={30} {...props} />,
    navigationOptions: {
        title: ' Mês'
    }
 }, 

 Rotinas: {

  name: 'Rotinas',
  screen: props => <TaskList title= ' Rotinas' daysAhead ={40} {...props} />,
  navigationOptions: {
      title: ' Rotinas'
  }
}, 





}


const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)



const mainRoutes = {

  AuthOrApp: {

    name: 'AuthOrApp',
    screen: AuthOrApp

  },

 Auth: {
    name: 'Auth', 
    screen: Auth
}, 

Home: {

 name: 'Home', 
 screen: menuNavigator

}




}

const mainNavigator = createSwitchNavigator(mainRoutes, {
     initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)