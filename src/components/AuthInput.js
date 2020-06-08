import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'



export default props => {

    return (

        <View style={[styles.container, props.style]}>
            <Icon name={props.icon} size={20} style={styles.icon}/>
            <TextInput  {...props} style={styles.input}/>

        </View>

    )


}


const styles = StyleSheet.create({

    icon:{
        color:'#333',
        marginLeft: 20
    },
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEE'

    },
    input:{
        marginLeft: 20,
        width: '80%'
    }

})