import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../utils/useTheme.util";
import styled from "styled-components/native";
import WandIcon from "../../icons/catalog/Wand";

const CreateProductButton = () => {
    const theme = useTheme();

    const Wrapper = styled.View`
        position: absolute;
        bottom: 41;
        right: 20;
        width: 56;
        height: 56;
        background-color: ${theme.accent};
        align-items: center;
        justify-content: center;
    `;

    return (
        <Wrapper style={{ borderRadius: "50%" }}>
            <WandIcon />
        </Wrapper>
    );
};

export default CreateProductButton;
