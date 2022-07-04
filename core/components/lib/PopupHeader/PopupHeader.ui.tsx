import { View, Text } from "react-native";
import React from "react";
import { HeaderWrapper } from "./styles";
import CustomText from "../CustomText";

/**
 * Acts as a nav bar (header) of sorts for popups.
 */
const PopupHeader = () => {
    return (
        <HeaderWrapper>
            <Text>h</Text>
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
