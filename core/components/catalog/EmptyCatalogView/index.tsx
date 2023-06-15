import React from "react";
import { View } from "react-native";
import EmptyCatalogIcon from "../../../icons/catalog/Empty";
import CustomText from "../../lib/CustomText";

interface IEmptyCatalogView {
    isSoldDash: boolean;
}

const EmptyCatalogView = (props: IEmptyCatalogView) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
            }}
        >
            <EmptyCatalogIcon />
            <CustomText fontSize={16} font="Bold" textAlign="center">
                {props.isSoldDash
                    ? `you haven't reached a deal\n on any of your products yet!`
                    : `you have no active\n products at the moment.`}
            </CustomText>
            <CustomText
                secondary
                fontSize={14}
                font="bold"
                style={{ marginTop: 12 }}
                textAlign="center"
            >
                {props.isSoldDash
                    ? `copy the link to one of your products\n and send it to your friends!`
                    : `create a new product to share it with your friends.`}
            </CustomText>
        </View>
    );
};

export default EmptyCatalogView;
