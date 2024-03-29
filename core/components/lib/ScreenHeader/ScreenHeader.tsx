import {
    View,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
    Image,
} from "react-native";
import React from "react";
import { HeaderWrapper } from "./styles";
import CustomText from "../CustomText";
import LeftArrowIcon from "../../../icons/common/leftArrow";
import LargeButton from "../LargeButton";
import { useTheme } from "../../../utils/useTheme.util";
import { observer } from "mobx-react";
import ProfileImage from "../ProfileImage";
import { useAuthStore } from "../../../state/auth/Auth.store";

export interface IScreenHeader {
    pfp?: boolean;
    photoURL?: string;
    onPfpPress?: (event: GestureResponderEvent) => void;
    backArrow?: boolean;
    backArrowOnPress?: (event: GestureResponderEvent) => void;
    title: string;
    subtitle?: string;
    progressIndicator?: boolean;
    currentStep?: number;
    totalSteps?: number;
    button?: boolean;
    buttonText?: string;
    onButtonPress?: () => void;
    buttonDisabled?: boolean;
    paddingBottom?: number;
}

/**
 * Acts as a nav bar (header) of sorts.
 */
const ScreenHeader = (props: IScreenHeader) => {
    const theme = useTheme();
    const authStore = useAuthStore();

    return (
        <HeaderWrapper style={{ paddingBottom: props.paddingBottom ?? null }}>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "auto",
                }}
            >
                {props.backArrow && (
                    <TouchableOpacity onPress={props.backArrowOnPress}>
                        <LeftArrowIcon />
                    </TouchableOpacity>
                )}
                {props.pfp && (
                    <TouchableOpacity onPress={props.onPfpPress}>
                        <ProfileImage specificUser={authStore.user} size={32} />
                    </TouchableOpacity>
                )}
            </View>
            <View
                style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CustomText
                        primary
                        textAlign="center"
                        font="Bold"
                        fontSize={16}
                    >
                        {props.title}
                    </CustomText>
                    {props.subtitle && (
                        <CustomText secondary textAlign="center" fontSize={14}>
                            {props.subtitle}
                        </CustomText>
                    )}
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    marginLeft: "auto",
                }}
            >
                {props.progressIndicator && (
                    <View
                        style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            padding: 10,
                            marginLeft: "auto",
                            marginRight: 0,
                            borderRadius: 12,
                        }}
                    >
                        <CustomText secondary textAlign="right">
                            {`${props.currentStep}/${props.totalSteps}`}
                        </CustomText>
                    </View>
                )}
                {props.button && (
                    <TouchableOpacity
                        onPress={() => props.onButtonPress()}
                        disabled={props.buttonDisabled}
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 10,
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                            backgroundColor: theme.accent,
                            borderRadius: 12,
                            opacity: props.buttonDisabled && 0.5,
                        }}
                    >
                        <CustomText fontSize={16}>
                            {props.buttonText}
                        </CustomText>
                    </TouchableOpacity>
                )}
            </View>
        </HeaderWrapper>
    );
};

export default observer(ScreenHeader);
