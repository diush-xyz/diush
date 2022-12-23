import {
    View,
    Text,
    GestureResponderEvent,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { HeaderWrapper } from "./styles";
import CustomText from "../CustomText";
import LeftArrowIcon from "../../../icons/common/leftArrow";
import LargeButton from "../LargeButton";
import { useTheme } from "../../../utils/useTheme.util";

export interface IScreenHeader {
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
}

/**
 * Acts as a nav bar (header) of sorts.
 */
const ScreenHeader = (props: IScreenHeader) => {
    const theme = useTheme();
    return (
        <HeaderWrapper>
            <View
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "auto",
                }}
            >
                <TouchableOpacity
                    onPress={
                        props.backArrow ? props.backArrowOnPress : () => null
                    }
                >
                    <LeftArrowIcon
                        style={{ opacity: props.backArrow ? 1 : 0 }}
                    />
                </TouchableOpacity>
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

export default ScreenHeader;
