import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../icons/auth/NoBackgroundLogo";
import LargeButton from "../../components/lib/LargeButton";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { useAuthStore } from "../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { AuthStatus } from "../../@types/GlobalTypes";
import GeneralAuthScreen from "./general";
import LoginScreen from "./login";
import SignupScreen from "./signup";

const AuthScreen = () => {
    const authStore = useAuthStore();

    const authFlowRenderer = () => {
        switch (authStore.authStatus) {
            case AuthStatus.SQUARE_ONE:
                return <GeneralAuthScreen />;
            case AuthStatus.LOGIN:
                return <LoginScreen />;
            case AuthStatus.SIGNUP:
                return <SignupScreen />;
            case AuthStatus.AUTHENTICATED:
                //TODO: Add this later
                return <></>;
        }
    };

    return <>{authFlowRenderer()}</>;
};

export default observer(AuthScreen);
