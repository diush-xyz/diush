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

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildLargeButton {
    children: React.ReactNode;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildLargeButton = (props: ICustomChildLargeButton) => {
    return (
        <>
            {/*@ts-ignore*/}
            <LinearGradient
                colors={["#C897F9", "#FF3F70"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                    height: 44,
                    width: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    padding: 2,
                    maxWidth: 328,
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
}

/**
 * Large button component with props (child provided for mos common use case.
 * @see CustomChildLargeButton for more options
 */
const LargeButton = (props: ILargeButton) => {
    return (
        <View style={{ display: "flex", width: "100%" }}>
            <CustomChildLargeButton
                onPress={props.onPress}
                style={GLOBAL_STYLES.largeButton}
                disabled={props.disabled}
            >
                <CustomText
                    primary
                    font="Bold"
                    style={{
                        alignSelf: "center",
                    }}
                >
                    {props.title}
                </CustomText>
            </CustomChildLargeButton>
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

export default LargeButton;
