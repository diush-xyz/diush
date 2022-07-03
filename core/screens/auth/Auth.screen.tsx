import { View, Text } from 'react-native';
import React from 'react';
import CustomText from '../../components/lib/CustomText/CustomText.ui';

const AuthScreen = () => {
  return (
    <View>
      <CustomText accent style={{ fontWeight: 'bold' }}>
        This is the auth screen
      </CustomText>
    </View>
  );
};

export default AuthScreen;
