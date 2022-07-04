import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { AuthStatus } from "../../../@types/GlobalTypes";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";

const SignupScreen = () => {
    const authStore = useAuthStore();
    return (
        <View>
            <Text>SignupScreen</Text>
            <TouchableOpacity
                onPress={() => authStore.setAuthStatus(AuthStatus.SQUARE_ONE)}
            >
                <CustomText primary>Back</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default observer(SignupScreen);
