import { View, Text, Button } from 'react-native';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Test = () => {
  const signUp = () => {
    createUserWithEmailAndPassword(auth, 'justpleaseman@diush.xyz', '123456')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('Created: ' + user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View>
      <Button title='Create acc' onPress={() => signUp()} />
    </View>
  );
};

export default Test;
