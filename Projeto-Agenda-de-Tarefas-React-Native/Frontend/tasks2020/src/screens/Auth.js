  /* eslint-disable prettier/prettier */

  import React, {Component, useState} from 'react' 
  import LinearGradient from 'react-native-linear-gradient';
  import{ View, Text, StyleSheet,
     TextInput, TouchableOpacity, 
      KeyboardAvoidingView, 
      KeyboardType,
      ScrollView,
      Alert,
      FlatList,
       keyboardVerticalOffset} from 'react-native'

  import axios from 'axios' 



  import AsyncStorage from '@react-native-community/async-storage' 
  

  import commonStyles from '../commonStyles'
 import AuthInput from '../components/AuthInput'
 import   { server, showError, showSucess} from '../common'

const initialState = {

  email: '', 
  password: '', 
  name: '', 
  confirmPassword: '', 
  stageNew: false

}



class Auth extends Component {

 state = { 
  ...initialState

 };

 signinOrSignup = () => {
  if(this.state.stageNew) {
      this.signup()
  } else {
      this.signin()
  }
}


signup = async () => {
  try {
      await axios.post(`${server}/signup`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
      })

      showSucess('Usuário cadastro!')
      this.setState({ ...initialState })
  } catch(e) {
      showError(e)
  }
}


signin = async () => {

  
  try {
      const res = await axios.post(`${server}/signin`, {
          email: this.state.email,
          password: this.state.password
      })

      AsyncStorage.setItem('userData', JSON.stringify(res.data))
      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
      this.props.navigation.navigate('Home', res.data)
  } catch(e) {
      showError(e)
  }  


 

}



    
      render(props) {


       const validations = []
       validations.push(this.state.email && this.state.email.includes('@'))
       validations.push(this.state.password && this.state.password.length >= 2 )

       if(this.state.stageNew){

             
        validations.push(this.state.name && this.state.name.trim().length >= 3 )
        validations.push(this.state.confirmPassword )
        validations.push(this.state.password  === this.state.confirmPassword )
          

       }
 
        const validForm = validations.reduce((t, a) => t && a)


        return ( 
          <LinearGradient 
          colors={['#6B00E7', '#E86BBB']}   style={[styles.container]}>
          
        <KeyboardAvoidingView style= {styles.container}  keyboardVerticalOffset= {50}> 
        <ScrollView  style={styles.scroll}> 
          <View style= {styles.fundo} >
            <Text style= {styles.title}>

              Agenda de Tarefa

            </Text>
      <Text style={styles.subtitle}>  
      
          {this.state.stageNew ? ' Crie sua conta' : 'Informe seus dados'}

      </Text>


      {this.state.stageNew &&
        
      
        <AuthInput icon='user' placeholder='Nome' value={this.state.name}  style={styles.input}
      onChangeText={name => this.setState({name})} />

      
      
      }


<AuthInput icon='at'
 placeholder='example@email.com' value={this.state.email}  style={styles.input}
        onChangeText={email => this.setState({email})} keyboardType="email-address"
         autoCapitalize="none" />


  <AuthInput icon='lock'
   placeholder='Senha' value={this.state.password} secureTextEntry={true}   
  style={styles.input}   
          onChangeText={password => this.setState({ password})}/>
          

  {this.state.stageNew && 
        
      
        <AuthInput icon='asterisk'
         placeholder='Confirmar Senha' value={this.state.confirmPassword} 
        style={styles.input}   secureTextEntry={true}   
        onChangeText={confirmPassword => this.setState({ confirmPassword})} />
    
          
        
        }
      
  
<Text style={styles.titlecadSenha}>  {this.state.stageNew ? '  ' : ' Esquceu senha ? '}  </Text>

  
<TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={stilo.button}>
                            <Text style={styles.text}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
  

  <TouchableOpacity style={ { padding: 10}}

   onPress = {
  () => this.setState( { stageNew: !this.state.stageNew }) }>

<Text style={styles.titlecad}>  {this.state.stageNew ? ' Ja possui uma conta ? ' : ' Ainda nao e cadastrado ? '}  </Text>
  <View style ={ stilo.button}>

<Text style= {styles.text}> 
  
  {this.state.stageNew ? ' Login ' : ' Registrar '}

  </Text>
</View>

  </TouchableOpacity>



              

          </View>



          </ScrollView>
          </KeyboardAvoidingView>
          </LinearGradient>

        );
      }
    }
  


    const styles = StyleSheet.create({

      container: {

      flex: 1
      },
 
      titlecadSenha:{
   
        fontFamily:commonStyles.fontFamily,
        color: '#FFF', 
        marginLeft: 258, 
        top:15,
        fontSize: 16

      },


      scroll: {
          width: '100%'
      },

      title: {

          fontFamily: commonStyles.fontFamily, 
          color: commonStyles.colors.secondary,
          fontSize: 30,
          padding: 50,
          bottom: 4,
          marginLeft: 34

      },

      subtitle: {

        fontFamily: commonStyles.fontFamily, 
        fontSize: 19, 
        color: '#FFF', 
        textAlign: 'center', 
        marginBottom: 2,
        marginRight: 23

      },
   
      titlecad:{
  
        fontFamily: commonStyles.fontFamily,
        fontSize: 18,
        color: '#FFF',
        marginLeft: 92, 
        marginTop: 34, 
        

      },


      fundo:{
          
          
          flex: 1,
          paddingBottom:200
      },

      input:{ 
        
          marginTop: 29,
          backgroundColor: '#FFF',
          textAlign:'center',
          marginLeft: 30,
          marginRight: 30,
          
          borderBottomLeftRadius: 45,
          borderBottomRightRadius: 45,
          borderTopLeftRadius: 45,
          borderTopRightRadius:45

      },

     conta: {
      fontFamily: commonStyles.fontFamily, 
       color: '#FFF',
      fontSize: 17, 
       textAlign: 'center', 
        marginTop: 25,
       
     },

      text: {

        color: '#FFF',
        fontSize:16


      },

      titlesenha: {

        color: '#FFF', 
        fontSize: 16, 
        marginLeft: 250,
          paddingTop: 20
        
      }



    })

  const stilo = StyleSheet.create({

      button: {
        
          backgroundColor: '#6B00E7',
          marginTop: 39,
          padding: 8, 
          alignItems: 'center',
          marginLeft: 32,
          marginRight: 32

      }, 


  })
    
  
    
    export default  Auth;