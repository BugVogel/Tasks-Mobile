import React, {Component} from 'react'
import { View, StyleSheet, ActivityIndicator} from 'react-native'
import AsincStorage from '@react-native-community/async-storage'
import axios from 'axios'



export default class AuthOrApp extends Component {

    componentDidMount = async () => {

        const userDataJSON = await AsincStorage.getItem('userData')
        let userData = null

        try{
            userData = JSON.parse(userDataJSON)
        }catch(e){

        }

        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        }
        else{
            this.props.navigation.navigate('Auth')
        }

    }


    render(){
        return(

            <View style={styles.container}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

}


const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})