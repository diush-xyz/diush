import {
    View,
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import React from "react";
import EmailIcon from "../../../icons/auth/Email";
import CustomText from "../../lib/CustomText";
import PhoneIcon from "../../../icons/auth/Phone";

interface ISignupOptionButton {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    icon: "email" | "phone";
    marginBottom?: number;
}

const SignupOptionButton = (props: ISignupOptionButton) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                height: 44,
                width: 330,
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 22,
                padding: 2,
                // make the background have 5% opacity from white
                backgroundColor: "rgba(255,255,255,0.05)",
                marginBottom: props.marginBottom || 0,
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {props.icon === "email" ? (
                    <EmailIcon style={{ marginRight: 8 }} />
                ) : (
                    <PhoneIcon style={{ marginRight: 8 }} />
                )}
                <CustomText secondary>{props.text}</CustomText>
            </View>
        </TouchableOpacity>
    );
};

export default SignupOptionButton;
