import React from "react";
import { View } from "react-native";
import { useTheme } from "../../../../utils/useTheme.util";
import styled from "styled-components/native";

const ActiveIndicator = () => {
    const theme = useTheme();

    const CustomView = styled(View)`
        box-shadow: 0px 0px 5px ${theme.success};
    `;
    return (
        <CustomView
            style={{
                width: 14,
                height: 14,
                marginLeft: 6,
                backgroundColor: theme.success,
                borderRadius: 7,
            }}
        />
    );
};

export default ActiveIndicator;
