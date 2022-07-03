import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText/CustomText.ui";
import LockIcon from "../../icons";

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
            <LockIcon fill="#ffffff" />
            <CustomText
                primary
                font="Bold"
                fontSize={24}
                style={{ marginBottom: 12 }}
            >
                hey there!
            </CustomText>
            <CustomText
                secondary
                font="Semibold"
                fontSize={16}
                textAlign="center"
            >
                a secure funnel for selling
                {"\n"} items to your friends and network.
            </CustomText>
        </View>
    );
};

export default AuthScreen;
