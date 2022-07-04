import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";
import CustomText from "../../lib/CustomText";

interface ICustomGradientCircle {
    emoji: string;
}

const CustomGradientCircle = (props: ICustomGradientCircle) => {
    const CustomGradientCircle = styled(LinearGradient)`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64;
        width: 64;
        border-radius: 32;
    `;
    return (
        <CustomGradientCircle colors={["#FF3F70", "#c897f9"]}>
            <CustomText fontSize={32}>{props.emoji}</CustomText>
        </CustomGradientCircle>
    );
};

export default CustomGradientCircle;
