import React from "react";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { deriveProductConditionFromDb } from "../../../../utils/productCondition.util";
import CustomText from "../../../lib/CustomText";
import HorizontalLine from "../HorizontalLine";
import { observer } from "mobx-react";
import { View } from "react-native";

const WrittenInfoSection = () => {
    const catalogStore = useCatalogStore();
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 60,
            }}
        >
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                blurb
            </CustomText>
            <CustomText secondary fontSize={17}>
                {catalogStore.activeProduct.blurb}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                condition
            </CustomText>
            <CustomText secondary fontSize={17}>
                {deriveProductConditionFromDb(
                    catalogStore.activeProduct.condition
                )}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                seller location
            </CustomText>
            <CustomText secondary fontSize={17}>
                This is my location.
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                additional info
            </CustomText>
            <CustomText secondary fontSize={17}>
                {catalogStore.activeProduct.additionalInfo}
            </CustomText>
        </View>
    );
};

export default observer(WrittenInfoSection);
