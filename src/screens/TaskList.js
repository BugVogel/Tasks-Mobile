import React, {Component} from 'react'
import {View, Text, StyleSheet, ImageBackground, FlatList, Platform, TouchableOpacity, Alert} from 'react-native'
import todayImg from '../../assets/imgs/today.jpg'
import tomorrowImg from '../../assets/imgs/tomorrow.jpg'
import weekImg from '../../assets/imgs/week.jpg'
import monthImg from '../../assets/imgs/month.jpg'

import commonStyles from '../commonStyles'

import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'


import AsyncStorage from'@react-native-community/async-storage'


import AddTask from './AddTask'
import axios from 'axios'
import {server,showErros} from  '../common'

import moment from 'moment'
import 'moment/locale/pt-br'



const initialState = {
    modalVisible: false,
    visibleTasks: [],
    showTasksDone: true,
    tasks: [] 
}


export default class TaskList extends Component {



    state = {
        ...initialState
    }


    saveTask = async newTask => {

        if(!newTask.desc || !newTask.desc.trim()){

            Alert.alert('Erro', 'Descrição não informada')
            return

        } 

        //Pesistencia remota
        try{

            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({ modalVisible: false}, this.loadTasks);

       }catch(e){
           showErros(e)
       }

       //Pesistencia local
        /*let tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random,
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null,

        })


        this.setState({tasks, modalVisible: false}, this.filterTask);
        */


    }


    loadTasks = async () => {

        try{

            const maxDate = moment().add({days:this.props.dayAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTask)

        }catch(e){
            showErros(e)
        }


    }


    componentDidMount = async () => {

        const stringState = await AsyncStorage.getItem('stateTasks');
        const state = JSON.parse(stringState) || initialState;
        this.setState({showTasksDone: state.showTasksDone},this.filterTask);

        this.loadTasks()
        

    }


    filterTask = () =>{
       
        let  visibleTasks  = [];
        
        if(this.state.showTasksDone){
            visibleTasks = [...this.state.tasks];
        }
        else{
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending);
            
        }

        
        this.setState({visibleTasks});
        AsyncStorage.setItem('stateTasks', JSON.stringify({
            showTasksDone: this.state.showTasksDone
        }));

        

    }


    deleteTask = async id => {

        //Pesistencia remota
        try{
            await axios.delete(`${server}/tasks/${id}`)
            this.loadTasks()

        }catch(e){
            showErros(e)
        }


        //pesistencia local
        /*
        let tasks = this.state.tasks.filter(task =>  id !== task.id)
        this.setState({tasks},this.filterTask);
        */

    }

    toggleFilter =  () => {


      
        this.setState({showTasksDone: !this.state.showTasksDone}, this.filterTask);
       
    }


    getImgBD = () => {

        switch(this.props.dayAhead){
            case 0: return todayImg
            break
            case 1: return tomorrowImg
            break
            case 7: return weekImg
            break
            default: return monthImg
        }

    }

    getColor = () => {

        switch(this.props.dayAhead){
            case 0: return commonStyles.colors.today
            break
            case 1: return commonStyles.colors.tomorrow
            break
            case 7: return commonStyles.colors.week
            break
            default: return commonStyles.colors.month
        }

    }


   

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')


        return(
            <View style={styles.container}>
                <AddTask onSave={this.saveTask} isVisible={this.state.modalVisible} onCancel={() => this.setState({modalVisible:false})}/>
                <ImageBackground source={this.getImgBD()} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon color={commonStyles.colors.secundary} size={20} name={'bars'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon color={commonStyles.colors.secundary} size={20} name={ this.state.showTasksDone ? 'eye' : 'eye-slash'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={ ({item}) => <Task onDelete={this.deleteTask} toggleTask={this.toggleTask}  {...item} ></Task>}/>
                </View>
                <TouchableOpacity activeOpacity={0.7}  onPress={() => this.setState({modalVisible: true})}style={[styles.addButton, {backgroundColor: this.getColor()}]}>
                    <Icon color={'#FFF'} name={'plus'} size={20}/>
                </TouchableOpacity>
            </View>

        )
    }


    toggleTask = async id => {



          //Pesistencia remota
          try{

            await axios.put(`${server}/tasks/${id}/toggle`);
            this.loadTasks();

        }catch(e){
            showErros(e)
        }


        //Pesistencia local
        /*
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
    
            if(task.id == id){
                task.doneAt = task.doneAt ? null : new Date()
            }
    
        })
    
        this.setState({tasks}, this.filterTask) 
    
    */
    }


}





const styles = StyleSheet.create({

    container:{
        flex : 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar:{
        flex: 1,
        justifyContent: 'flex-end',
        
    },
    title:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
        color: commonStyles.colors.secundary,
    },
    subTitle:{
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20,
        color: commonStyles.colors.secundary,
    },
    iconBar: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    

    },
    addButton:{
        position:'absolute',
        bottom:20,
        right: 20,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
 


})