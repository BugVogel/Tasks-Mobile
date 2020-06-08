import React , {Component} from 'react'
import {
    StyleSheet, 
    Text, 
    ImageBackground, 
    TouchableOpacity,
     View, 
     Platform,
    Alert} from 'react-native'


import axios from 'axios'
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import AsincStorage from '@react-native-community/async-storage'


import {server, showErros, showSucess} from '../common'

const initialState = {
    name: '',
    email: 'bugvogel@gmail.com',
    password: '123',
    confirmPassword: '',
    registerMode: false,

}


export default class Auth extends Component {


    state ={
      ...initialState
    }

    signupOrSignin = () =>{

        if(this.state.registerMode){
            this.signUp()
        }
        else{
            this.signIn()
        }

    }


    signIn = async () => {

        try{

        const res = await axios.post(`${server}/signin`, {
            email: this.state.email,
            password: this.state.password,
        })
        
       
        axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
        AsincStorage.setItem('userData',JSON.stringify(res.data))
        this.props.navigation.navigate('Home', res.data)
        }
        catch(e){
            showErros(e)
        }
    }

    signUp = async () => {

        try{
        await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSucess('Usuário cadastrado!');
            this.setState({...initialState});

        }
        catch(e)
        {
            showErros(e)
        }


    }


    render(){

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 3)

        if(this.state.registerMode){
            validations.push(this.state.name)
            validations.push(this.state.password === this.state.confirmPassword)

        }

        const validForm = validations.reduce((p,a ) => p && a)


        return(

            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>

                <View style={styles.forms}>
                    <Text style={styles.subtitle}>{ this.state.registerMode ? 'Crie uma nova conta' : 'Informe seus dados'}</Text>
                    {this.state.registerMode &&
                        <AuthInput icon='user' placeholder={'Nome'} style={styles.input} value={this.state.name}  onChangeText={name => this.setState({name})}/>
                    }
                    <AuthInput icon='at' placeholder={'Email'} style={styles.input} value={this.state.email}  onChangeText={email => this.setState({email})}/>
                    <AuthInput icon='lock' secureTextEntry={true} placeholder={'Senha'} style={styles.input} value={this.state.password} onChangeText={password => this.setState({password})} />
                    {this.state.registerMode &&
                        <AuthInput icon='asterisk' secureTextEntry={true} placeholder={'Confirmar senha'} style={styles.input} value={this.state.confirmPassword}  onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }
                    <TouchableOpacity onPress={this.signupOrSignin} style={[styles.button, validForm ? {}: {backgroundColor: '#AAA'}]} disabled={!validForm}>
                        <View >
                            <Text style={styles.buttonText}>
                                {this.state.registerMode ? 'Cadastrar' : 'Entrar'}
                                </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={ () => this.setState({registerMode: !this.state.registerMode})} style={{padding:10}}> 
                    <Text style={styles.buttonText}>{ this.state.registerMode ? 'Já possui conta ?' : 'Ainda não possui conta ?'}</Text>
                </TouchableOpacity>
             
            </ImageBackground>


        )
    }

}



const styles= StyleSheet.create({

    background: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    },

    title:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 70,
        marginBottom: 10,
        color: commonStyles.colors.secundary,
    }, 
    subtitle:{
        marginTop: 10,
        fontSize: 15,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
    },
    forms : {
        backgroundColor: 'rgba(0,0,0,0.8)',
     
        width:'90%',
        alignItems: 'center',


    },
    input: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#FFF',
        marginTop: 10,
        width:'90%',
        color: 'black'
        
    },
    button:{
        backgroundColor: '#080',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        width:'90%',
        marginBottom: 10,
        borderRadius: 7,
        

    },
    buttonText:{
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 20,
      
    }


})