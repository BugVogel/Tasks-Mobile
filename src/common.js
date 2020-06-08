import {  Alert, Platform} from 'react-native'


const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'


const showSucess = msg => {

    Alert.alert('Sucesso!', msg)

}


const showErros = err => {

    if(err.response && err.response.data){
        Alert.alert('Ops! Ocorreu um erro!', `Mensagem:${err.response.data}`)
    }else{
        Alert.alert('Ops! Ocorreu um erro!', `Mensagem:${err}`)
    }
    

}


export {server, showErros, showSucess}