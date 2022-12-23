import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";
import { useTheme } from "../../../../utils/useTheme.util";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";

const AskingPriceSection = () => {
    const theme = useTheme();
    const catalogStore = useCatalogStore();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                asking price
            </CustomText>
            <CustomText accent font="Bold" fontSize={24}>
                ${catalogStore.activeProduct.askingPrice}
            </CustomText>
        </View>
    );
};

export default AskingPriceSection;
