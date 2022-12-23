import React from "react";
import { View } from "react-native";
import CustomText from "../../../lib/CustomText";
import CustomTextInput from "../../../lib/CustomTextInput";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { observer } from "mobx-react";

const TitleAndBlurb = () => {
    const catalogStore = useCatalogStore();

    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            <CustomText fontSize={18} style={{ marginBottom: 12 }}>
                title
            </CustomText>
            <CustomTextInput
                defaultValue={catalogStore.activeProduct.title}
                placeholder="PlayStation 5"
                onChangeText={(text: string) =>
                    catalogStore.setActiveProductTitle(text)
                }
            />
        </View>
    );
};

export default observer(TitleAndBlurb);
