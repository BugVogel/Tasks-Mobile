import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator} from'react-navigation-drawer'

import Auth from './screens/Auth'
import TaskList from './screens/TaskList'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'
import AuthOrApp from './screens/AuthOrApp'


const menuConfig = {

    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle:{
            fontFamily: commonStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20

        },
        activeLabelStyle:{
            color: '#080',
            fontWeight: 'bold',
        }
    }

}


const mainDrawer = {

    Today: {
        name: 'Today',
        screen: props => <TaskList title={'Hoje'} dayAhead={0} {...props} />,
        navigationOptions : {
            title: 'Hoje'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <TaskList title={'Amanhã'} dayAhead={1} {...props} />,
        navigationOptions : {
            title: 'Amanhã'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <TaskList title={'Semana'} dayAhead={7} {...props} />,
        navigationOptions : {
            title: 'Semana'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <TaskList title={'Mês'} dayAhead={30} {...props} />,
        navigationOptions : {
            title: 'Mês'
        }
    },

}

const nav = createDrawerNavigator(mainDrawer, menuConfig)


const mainRoutes  = {

    AuthOrApp:{
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
    Auth:{
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        screen: nav

    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)