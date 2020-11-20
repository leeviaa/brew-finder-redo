import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import AlertPopUp from '../components/AlertPopUp';

const AuthForm = ({buttonText, onSubmit}) => {
  //context for error display
  const {state: { errorMessage } } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

 return (
   <>
   <Input
     label="Email"
     value={email}
     onChangeText={(newEmail) => setEmail(newEmail)}
     autoCorrect={false}
     autoCapitalize="none"
    />
   <Input 
      label="Password" 
      value={password}
      onChangeText={(newPassword) => setPassword(newPassword)} 
      secureTextEntry
      autoCorrect={false}
      autoCapitalize="none"
   />
      {errorMessage  ? <AlertPopUp 
                          textColor="white"
                          backgroundColor="#ff3333" message={errorMessage}
                       /> 
                       : null }
   <Button title={buttonText} onPress={() => onSubmit({email, password})} />

   </>
 )
}

const styles = StyleSheet.create({
  
});

export default AuthForm