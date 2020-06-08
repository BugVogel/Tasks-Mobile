import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'


import moment from 'moment'
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'


import Swipeable from 'react-native-gesture-handler/Swipeable'


export default props => {


    const doneOrNotStyle = props.doneAt != null ? 
        {textDecorationLine: 'line-through'} : {}

    const  lateTask  = props.estimateAt <= moment().format('YYYY-MM-DD 23:59:59')  ? {color:'red', fontWeight: 'bold', flex:1} : {color: '#2C3539', flex: 1}

    const date = props.doneAt ? props.doneAt : props.estimateAt  
    const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')


    const getSwipebleWrite = () =>{
        return (
            <TouchableOpacity onPress={() => props.onDelete && props.onDelete(props.id)} style={styles.deleteButton1}>
                <Icon  name='trash' size={20} color={'#FFF'}/>
            </TouchableOpacity>
        )

    }

    const getSwipebleLeft = () =>{
        return (
            <View style={styles.deleteButton2}>
                <Icon style={styles.iconDelete2} name='trash' size={20} color={'#FFF'}/>
                <Text style={styles.textExclude}>Excluir</Text>
            </View>
        )

    }

    return (

        <Swipeable renderRightActions={getSwipebleWrite} renderLeftActions={getSwipebleLeft} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback  style={styles.containerToggle} onPress={ () => props.toggleTask(props.id)}>
                    <View style={styles.verifyTask}>
                        {getVerifyTask()}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.containerDesc}>
                    <Text style={[styles.desc, doneOrNotStyle, lateTask]}>{props.desc + ""}</Text>
                    <Text style={lateTask}>{formatedDate + ""}</Text>
                </View>
            </View>
        </Swipeable>

    )


    function getVerifyTask(){

        if(props.doneAt != null){
            return (
                <View style={styles.checked}>
                    <Icon name="check" size={20} color={commonStyles.colors.secundary}/>
                </View>
            )
        }
        else{
            return(
                <View style={styles.unChecked}></View>
            )
        }
    
    
    }



}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    verifyTask:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    unChecked:{
        width: 25,
        height: 25,
        borderRadius: 13,
        borderColor: '#555',
        borderWidth: 1

    },
    checked:{
        width: 25,
        height: 25,
        borderRadius: 13,
        borderColor: '#555',
        borderWidth: 1,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc:{
        fontFamily:commonStyles.fontFamily,
        fontSize: 15,
        
    },
    subTitle: {
        color: commonStyles.colors.subtitle,
        fontSize: 12,
        fontFamily: commonStyles.fontFamily,
    },
    deleteButton1:{
        backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20

    },
    deleteButton2:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex:1,
        
       
    },
    iconDelete2:{
        marginLeft: 20,

    },
    textExclude:{
        color: '#FFF',
        fontFamily: commonStyles.fontFamily,
        marginLeft: 20,
        fontSize: 18,
        
       
    },
    containerDesc:{
  
        flex:1,
    },
    containerToggle:{
     
        flex:1,
    }
  


})