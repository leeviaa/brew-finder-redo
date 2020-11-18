import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';

const AuthForm = ({buttonText, onSubmit}) => {
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
   <Button title={buttonText} onPress={() => onSubmit({email, password})} />
   </>
 )
}

const styles = StyleSheet.create({
  
});

export default AuthForm