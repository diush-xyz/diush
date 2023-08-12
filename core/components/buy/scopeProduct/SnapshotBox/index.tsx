import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";
import DataElement from "./DataElement";

interface ISnapshotBox {
    askingPrice: number;
    highestOffer?: string;
    posted: string; //must be parsed when passed in
}

const SnapshotBox = (props: ISnapshotBox) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#ffffff0D",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 40,
                paddingVertical: 14,
                marginTop: 30,
            }}
        >
            <DataElement title="asking price" value={`$${props.askingPrice}`} />
            <DataElement title="highest" value={props.highestOffer} />
            <DataElement title="posted" value={props.posted} />
        </View>
    );
};

export default SnapshotBox;
