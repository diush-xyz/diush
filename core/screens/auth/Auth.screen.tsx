import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import NoBackgroundLogo from "../../icons/auth/NoBackgroundLogo";

const AuthScreen = () => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
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
            >
                welcome to a secure funnel for selling
                {"\n"} items to your friends and network.
            </CustomText>
        </View>
    );
};

export default AuthScreen;
