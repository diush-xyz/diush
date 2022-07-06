import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

interface ICustomGradientCircle {
    emoji: string;
}

const CustomGradientCircle = (props: ICustomGradientCircle) => {
    const CustomGradientCircle = styled(LinearGradient)`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 64px;
        width: 64px;
        border-radius: 32px;
    `;
    return (
        <CustomGradientCircle colors={["#FF3F70", "#c897f9"]}>
            {/*this is using the normal Text component because of rendering issues with CustomText in the bottom sheet*/}
            <Text style={{ fontSize: 32 }}>{props.emoji}</Text>
        </CustomGradientCircle>
    );
};

export default CustomGradientCircle;
