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

export interface IPopupHeader {
    backArrow?: boolean;
    backArrowOnPress?: (event: GestureResponderEvent) => void;
}

/**
 * Acts as a nav bar (header) of sorts for popups.
 */
const PopupHeader = (props: IPopupHeader) => {
    return (
        <HeaderWrapper>
            <TouchableOpacity
                onPress={props.backArrow ? props.backArrowOnPress : () => null}
            >
                <LeftArrowIcon style={{ opacity: props.backArrow ? 1 : 0 }} />
            </TouchableOpacity>
            <View style={{ display: "flex", flexDirection: "column" }}>
                <CustomText
                    primary
                    textAlign="center"
                    font="Bold"
                    fontSize={16}
                >
                    method
                </CustomText>
                <CustomText secondary textAlign="center" fontSize={14}>
                    signup
                </CustomText>
            </View>
            <Text>h</Text>
        </HeaderWrapper>
    );
};

export default PopupHeader;
