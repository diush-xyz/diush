import React from "react";
import {
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import CustomText from "../CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import { MAX_WIDTH } from "../../../utils/constants";
import styled from "styled-components/native";

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildSmallButton {
    children: React.ReactNode;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

const BORDER_COLORS = ["#C897F9", "#FF3F70"];

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildSmallButton = (props: ICustomChildSmallButton) => {
    return (
        <>
            {/*@ts-ignore*/}
            <LinearGradient
                colors={props.disabled ? ["transparent"] : BORDER_COLORS}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                    opacity: props.disabled ? 0.5 : 1,
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    maxWidth: MAX_WIDTH,
                    padding: 2,
                    height: 30,
                }}
            >
                <TouchableOpacity
                    onPress={props.onPress}
                    disabled={props.disabled}
                    style={props.style}
                >
                    {/*@ts-ignore*/}
                    {props.children}
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
};

interface ISmallButton {
    title: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    footer?: boolean;
    footerButtonTitle?: string;
    footerButtonOnPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
}

/**
 * Large button component with props (child provided for mos common use case.
 * @see CustomChildSmallButton for more options
 */
const SmallButton = (props: ISmallButton) => {
    const theme = useTheme();
    return (
        <View style={{ display: "flex", width: "100%" }}>
            <CustomChildSmallButton
                onPress={props.onPress}
                style={{
                    flex: 1.0,
                    paddingHorizontal: 20,
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: theme.background,
                    borderRadius: 22,
                    opacity: props.disabled ? 0.5 : 1,
                }}
                disabled={props.disabled}
            >
                <CustomText
                    primary
                    font="Bold"
                    fontSize={14}
                    style={{
                        alignSelf: "center",
                        opacity: props.disabled ? 0.5 : 1,
                    }}
                >
                    {props.title}
                </CustomText>
            </CustomChildSmallButton>
            {props.footer ? (
                <TouchableOpacity onPress={props.footerButtonOnPress}>
                    <CustomText
                        font="Heavy"
                        secondary
                        style={{
                            alignSelf: "center",
                            marginTop: 25,
                        }}
                    >
                        {props.footerButtonTitle}
                    </CustomText>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default SmallButton;
