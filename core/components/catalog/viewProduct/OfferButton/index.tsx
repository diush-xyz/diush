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
import { useTheme } from "../../../../utils/useTheme.util";
import { MAX_WIDTH } from "../../../../utils/constants";
import CustomText from "../../../lib/CustomText";
import styled from "styled-components/native";

//TODO: Must add proper gradient background to button (not working, blank for now)

interface ICustomChildLargeButton {
    children: React.ReactNode;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

const TOpacity = styled(TouchableOpacity)`
    box-shadow: 0px 0px 5px #ff3f70;
`;

/**
 * Same as Large Button (only no provided child with props). Fully custom.
 */
export const CustomChildLargeButton = (props: ICustomChildLargeButton) => {
    const theme = useTheme();
    return (
        <>
            <TOpacity
                onPress={props.onPress}
                disabled={props.disabled}
                style={{
                    opacity: props.disabled ? 0.5 : 1,
                    height: 44,
                    width: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 22,
                    padding: 2,
                    maxWidth: MAX_WIDTH,
                    backgroundColor: theme.accent,
                }}
            >
                {/*@ts-ignore*/}
                {props.children}
            </TOpacity>
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
const OfferButton = (props: ILargeButton) => {
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
            >
                <CustomText
                    primary
                    font="Heavy"
                    fontSize={18}
                    style={{
                        alignSelf: "center",
                        opacity: props.disabled ? 0.5 : 1,
                    }}
                >
                    {props.title}
                </CustomText>
            </CustomChildLargeButton>
        </View>
    );
};

export default OfferButton;
