import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../icons/auth/NoBackgroundLogo";
import LargeButton from "../../components/lib/LargeButton";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../utils/useTheme.util";

const AuthScreen = () => {
    const theme = useTheme();
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
            {/* <LargeButton onPress={() => null} style={GLOBAL_STYLES.largeButton}>
                <Text>Create acc</Text>
            </LargeButton> */}
            {/*@ts-ignore*/}
            <LargeButton
                title="get started"
                onPress={() => null}
                footer
                footerButtonTitle="i already have an account"
                footerButtonOnPress={() => null}
            />
            {/*  */}
        </View>
    );
};

export default AuthScreen;
