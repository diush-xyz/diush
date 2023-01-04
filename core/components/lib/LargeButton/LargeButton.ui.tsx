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

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildLargeButton {
    children: React.ReactNode;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    isSuccessButton?: boolean;
}

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildLargeButton = (props: ICustomChildLargeButton) => {
    const theme = useTheme();
    const BORDER_COLORS = ["#C897F9", "#FF3F70"];
    const SUCCESS_BORDER_COLORS = [theme.success, theme.success];

    return (
        <>
            {/*@ts-ignore*/}
            <LinearGradient
                colors={
                    props.disabled
                        ? ["transparent"]
                        : props.isSuccessButton
                        ? SUCCESS_BORDER_COLORS
                        : BORDER_COLORS
                }
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                    opacity: props.disabled ? 0.5 : 1,
                    height: 44,
                    width: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    padding: 2,
                    maxWidth: MAX_WIDTH,
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

interface ILargeButton {
    title: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    footer?: boolean;
    footerButtonTitle?: string;
    footerButtonOnPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
    footerButtonPrimary?: boolean;
    isSuccessButton?: boolean;
}

/**
 * Large button component with props (child provided for mos common use case.
 * @see CustomChildLargeButton for more options
 */
const LargeButton = (props: ILargeButton) => {
    const theme = useTheme();
    return (
        <View style={{ display: "flex", width: "100%" }}>
            <CustomChildLargeButton
                onPress={props.onPress}
                style={{
                    flex: 1.0,
                    paddingVertical: 11,
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "100%",
                    backgroundColor: theme.background,
                    borderRadius: 22,
                    opacity: props.disabled ? 0.5 : 1,
                }}
                disabled={props.disabled}
                isSuccessButton={props.isSuccessButton}
            >
                <CustomText
                    primary
                    font="Bold"
                    style={{
                        alignSelf: "center",
                        opacity: props.disabled ? 0.5 : 1,
                    }}
                >
                    {props.title}
                </CustomText>
            </CustomChildLargeButton>
            {props.footer ? (
                <TouchableOpacity onPress={props.footerButtonOnPress}>
                    <CustomText
                        font="Heavy"
                        primary={props.footerButtonPrimary}
                        secondary={!props.footerButtonPrimary}
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

export default LargeButton;
