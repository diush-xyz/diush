import React from "react";
import { View } from "react-native";

interface IHorizontalLine {
    marginVertical?: number;
}

const HorizontalLine = (props: IHorizontalLine) => {
    return (
        <View
            style={{
                width: "100%",
                height: 1,
                backgroundColor: "#ffffff0D",
                marginVertical: props.marginVertical ?? 25,
            }}
        />
    );
};

export default HorizontalLine;
