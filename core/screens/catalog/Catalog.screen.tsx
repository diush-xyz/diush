import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText";
import PopupHeader from "../../components/lib/PopupHeader";
import ScreenHeader from "../../components/lib/ScreenHeader";

const CatalogScreen = () => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}
        >
            <ScreenHeader backArrow title="my catalog" />
            <CustomText primary>This is my catalog.</CustomText>
        </View>
    );
};

export default CatalogScreen;
