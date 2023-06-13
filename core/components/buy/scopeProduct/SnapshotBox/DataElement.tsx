import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";

interface IDataElement {
    title: string;
    value: string;
}

const DataElement = (props: IDataElement) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CustomText fontSize={12} style={{ opacity: 0.6, marginBottom: 6 }}>
                {props.title}
            </CustomText>
            <CustomText font="Heavy" fontSize={18}>
                {props.value}
            </CustomText>
        </View>
    );
};

export default DataElement;
