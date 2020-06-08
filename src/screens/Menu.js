import React from 'react'
import {ScrollView} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import { View, StyleSheet, Text, Platform, TouchableOpacity} from 'react-native'
import axios from 'axios'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'


export default props => {


    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
        

    }

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar  style={styles.avatar} options={{
                    email: props.navigation.getParam('email'),
                    secure: true
                }}/>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.name}>Bem vindo {props.navigation.getParam('name')}</Text>
                <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
                <TouchableOpacity onPress={logout}>
                    <Icon name='sign-out' size={20} color={'#800'} />
                </TouchableOpacity>
            </View>
            <DrawerItems {...props} />
        </ScrollView>

    )

}


const styles = StyleSheet.create({
    header:{
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222',
        marginTop: Platform.OS === 'ios' ? 50 : 10
    },
    title:{
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70:30,
        padding: 10
    },
    userInfo:{
        marginLeft: 10,
    
    },
    name: {
        fontSize: 20,
        fontFamily: commonStyles.fontFamily,
        marginBottom: 5,
        color:commonStyles.colors.mainText
    },
    email:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subtitle,
        marginBottom: 10,

    }




})