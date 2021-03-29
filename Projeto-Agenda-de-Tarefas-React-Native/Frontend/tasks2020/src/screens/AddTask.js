/* eslint-disable prettier/prettier */
import React, {Component} from 'react' 
import {
    Modal, View, StyleSheet, Text,TextInput,  TouchableWithoutFeedback, TouchableOpacity, Platform
} from 'react-native';

import commonStyles from '../commonStyles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import 'moment/min/moment-with-locales' 
import Icon from 'react-native-vector-icons/FontAwesome'



const initialState = {desc: '', date: new Date(), showdatePicker: false}

export default class AddTask extends Component{



 state = {
 ...initialState

 }

 save = () => {

 const newTask = {

    desc: this.state.desc, 
    date: this.state.date

 }

   this.props.onSave && this.props.onSave(newTask)
   this.setState({...initialState})
 }

  getDatetime = () => {
    let datePicker = (
        <DateTimePicker  style={styles.picker}
          mode="date"
          value={this.state.date}
          onChange={(_, date) => {
            date = date ? date : new Date()
            this.setState({date, showDatePicker: false})
          }}
        />
      )
      
      const dateString = moment(this.state.date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')
     
   
          datePicker = (
              <View>
                  <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                      <Text style={styles.date}>
                          {dateString}
                      </Text>
                  </TouchableOpacity>
                  {this.state.showDatePicker && datePicker}
              </View>
          )
      
      
      return datePicker
  }

    render() {

     return (

        <Modal transparent={true} visible={this.props.isVisible}
         onRequestClose={this.props.onCancel}
         animationType='slide'>
  
          <TouchableWithoutFeedback
          onPress={this.props.onCancel}>

          <View style={styles.background}></View>


          </TouchableWithoutFeedback>

         <View style={styles.container}>
 
         <Text style={styles.header}>Nova Tarefa</Text>
         <TextInput style={styles.input}
         placeholder="Informe a descricao" value={this.state.desc}
         onChangeText={desc => this.setState({desc})}/>

          <View style={styles.calendar}>
             <Icon  name='calendar'  style={{ marginLeft: 17 }}  size={32} color='#800'  /> 
              { this.getDatetime()} 
           </View>

          <View style={styles.buttons}>
             <TouchableOpacity  onPress={this.props.onCancel}>
               <Text style={styles.button}>Cancelar</Text>  
             </TouchableOpacity>
              
             <TouchableOpacity onPress={this.save}>
             <Text style={styles.button}>Salvar</Text>
             </TouchableOpacity>
          </View>
         </View>




          <TouchableWithoutFeedback
          onPress={this.props.onCancel}>

          <View style={styles.background}></View>


          </TouchableWithoutFeedback>





        </Modal>
        )
    }
}


const styles = StyleSheet.create({

   background: {
   flex: 1, 
   backgroundColor: 'rgba(0,0,0, 0.7)',

   }, 

   container: {

      backgroundColor: '#FFF', 


   },  
    
    calendar: {
     marginLeft: 2,
     padding: 3
     

    },

 

    date:{
    fontFamily: commonStyles.fontFamily, 
    fontSize: 20,
    marginLeft: 15,


    },

    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today, 
        color: commonStyles.colors.secondary, 
        textAlign: 'center',
        padding: 15, 
        fontSize: 19,
    },

    input: {
       fontFamily: commonStyles.fontFamily, 
       
       height: 40,
       margin: 15,
       backgroundColor: '#FFF',
       borderWidth: 1, 
        borderColor: '#E3E3E3',
        borderRadius: 6,


    }, 

     button: {

        margin:20,
        marginRight: 30,
        color: commonStyles.colors.today,

     },

    buttons: {

     flexDirection: 'row',
     justifyContent: 'flex-end',

    }
})