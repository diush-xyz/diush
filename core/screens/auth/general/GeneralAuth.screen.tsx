import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../../icons/auth/NoBackgroundLogo";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import LargeButton from "../../../components/lib/LargeButton";
import { AuthStatus } from "../../../@types/GlobalTypes";

const GeneralAuthScreen = () => {
    const authStore = useAuthStore();
    return (
        <View style={GLOBAL_STYLES.page}>
            <NoBackgroundLogo fill="#ffffff" />
            <CustomText
                primary
                font="Bold"
                fontSize={24}
                style={{ marginTop: 24, marginBottom: 12 }}
            >
                hey there!
            </CustomText>
            <CustomText
                secondary
                font="Semibold"
                fontSize={16}
                textAlign="center"
                style={{ marginBottom: 80 }}
            >
                welcome to a secure funnel for selling
                {"\n"} items to your friends and network.
            </CustomText>
            <LargeButton
                title="get started"
                onPress={() => authStore.setAuthStatus(AuthStatus.SIGNUP)}
                footer
                footerButtonTitle="i already have an account"
                footerButtonOnPress={() =>
                    authStore.setAuthStatus(AuthStatus.LOGIN)
                }
            />
            {/*  */}
        </View>
    );
};

export default observer(GeneralAuthScreen);
