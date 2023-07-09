import {
    View,
    Text,
    StyleProp,
    TextStyle,
    GestureResponderEvent,
} from "react-native";
import React from "react";
import { useTheme } from "../../../utils/useTheme.util";

interface ICustomText {
    children: React.ReactNode;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    accent?: boolean;
    customColor?: string;
    fontSize?: number;
    style?: TextStyle;
    font?: string;
    textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
    onPress?: (event: GestureResponderEvent) => void;
}

/**
 * Diush's very own custom, all-in-one text component.
 * @param props Basic information for the text component to function; reference the ICustomText interface
 *
 * @example ```ts
 * <CustomText primary>this is a snippet of text</CustomText>
 * ```
 */
const CustomText = (props: ICustomText) => {
    const theme = useTheme();

    const populateColorStyle = (): string | undefined => {
        //TODO: fix this logic later, very inefficient, just for testing
        if (props.primary) {
            return theme.primaryText;
        } else if (props.secondary) {
            return theme.secondary;
        } else if (props.accent) {
            return theme.accent;
        } else if (props.customColor) {
            return props.customColor;
        } else if (props.success) {
            return theme.success;
        }

        // if not argument is provided:
        return theme.primaryText;
    };

    return (
        <Text
            style={{
                color: populateColorStyle(),
                fontSize: props.fontSize ?? 16,
                ...props.style,
                fontFamily: props.font ?? "Semibold",
                textAlign: props.textAlign,
            }}
            onPress={props.onPress}
        >
            {/*TODO: fix this later with TS rn children*/}
            {/*@ts-ignore*/}
            {props.children}
        </Text>
    );
};

export default CustomText;
