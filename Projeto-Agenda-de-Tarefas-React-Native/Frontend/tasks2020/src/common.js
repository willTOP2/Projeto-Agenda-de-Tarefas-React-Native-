/* eslint-disable prettier/prettier */
import {Alert} from 'react-native'

const server = 'http://192.168.96.13:3000'

function showError(err){

     if(err.response && err.response.data){

     Alert.alert('ops! Ocorreu um problema!', `Mensagem: ${err.response.data}`) 
     
     } else {

        Alert.alert('ops! Ocorreu um problema!', `Mensagem: ${err.response.data}`) 
   
     }
   


}

function showSucess(msg){

    Alert.alert('Sucesso!', msg)
}

export{server, showError, showSucess}