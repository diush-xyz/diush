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

    //make a function that takes in the text version of font weight and returns the number value
    const temporary = (): number => {
        switch (props.font) {
            case "Ultralight":
                return 100;
            case "Light":
                return 200;
            case "Thin":
                return 300;
            case "Regular":
                return 400;
            case "Medium":
                return 500;
            case "Semibold":
                return 600;
            case "Bold":
                return 700;
            case "Heavy":
                return 800;
            case "Black":
                return 900;
        }
    };

    return (
        <Text
            //@ts-ignore
            style={{
                color: populateColorStyle(),
                fontSize: props.fontSize ?? 16,
                ...props.style,
                // fontFamily: props.font ?? "Semibold",
                // fontFamily: "Semibold",
                fontWeight: props.font ? temporary() : 600,
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
