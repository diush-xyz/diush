import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";
import DataElement from "./DataElement";

interface ISnapshotBox {
    askingPrice: number;
    highestOffer?: number;
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
                paddingHorizontal: 60,
                paddingVertical: 14,
                marginTop: 30,
            }}
        >
            <DataElement title="asking price" value={`$${props.askingPrice}`} />
            <DataElement
                title="highest"
                value={`${
                    props.highestOffer ? "$" + props.highestOffer : "N/A"
                }`}
            />
            <DataElement title="posted" value={props.posted} />
        </View>
    );
};

export default SnapshotBox;
