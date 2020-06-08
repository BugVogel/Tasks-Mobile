import React, { Component} from 'react'
import {Platform,View, TouchableWithoutFeedback, Modal, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'


import commonStyles from '../commonStyles'


import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'
import 'moment/locale/pt-br'

const initialState = { desc: '', date: new Date(), showDatePicker: false}


export default class AddTask extends Component {


    state= {

        ...initialState,

    }


    save = () => {

        let newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave(newTask);
        this.setState({...initialState});


    }


    getTimeDatePicker = () => {

        let datePicker = <DateTimePicker mode={'date'} value={this.state.date} onChange={(_,date) => date != null ? this.setState({date, showDatePicker: false}) : this.setState({date: new Date(), showDatePicker: false}) } />

        let dateName = moment(this.state.date).locale('pt-br').format('dddd, D [de] MMMM [de] YYYY')


        if(Platform.OS === 'android'){

            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker:true})}>
                        <Text style={styles.date}>{dateName}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )


        }

        return datePicker;


    }


    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide' > 
                <TouchableWithoutFeedback  onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Nova Tarefa</Text>
                        <TextInput  placeholder={'Infome a descrição da tarefa'}  onChangeText={desc => this.setState({desc})} value={this.state.desc}  style={styles.input}></TextInput>
                        {this.getTimeDatePicker()}
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={this.save} >
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.props.onCancel} >
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback  onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>


        )
    }





}


const styles = StyleSheet.create({

    background:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container:{
   
        backgroundColor: commonStyles.colors.secundary
    },
    header:{
        color: commonStyles.colors.secundary,
        padding: 15,
        textAlign: 'center',
        backgroundColor: commonStyles.colors.today,
        fontFamily: commonStyles.fontFamily,
        fontSize: 18,
    },
    buttons:{
    
        flexDirection: 'row',
        justifyContent: 'flex-end'

    },
    input:{
        fontFamily:commonStyles.fontFamily,
        margin: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        backgroundColor: '#FFF',
        


    },
    button:{
        margin:20,
        color: commonStyles.colors.today,

    },
    date:{
        marginLeft: 20,
        fontSize: 16,
        fontFamily: commonStyles.fontFamily
    }

})