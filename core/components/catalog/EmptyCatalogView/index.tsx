import React from "react";
import { View } from "react-native";
import EmptyCatalogIcon from "../../../icons/catalog/Empty";
import CustomText from "../../lib/CustomText";

const EmptyCatalogView = () => {
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
                you have no active {`\n`} products at the moment.
            </CustomText>
            <CustomText
                secondary
                fontSize={14}
                font="bold"
                style={{ marginTop: 12 }}
            >
                create a new product to share it with your friends.
            </CustomText>
        </View>
    );
};

export default EmptyCatalogView;
