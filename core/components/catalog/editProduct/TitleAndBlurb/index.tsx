import React from "react";
import { Keyboard, View } from "react-native";
import CustomText from "../../../lib/CustomText";
import CustomTextInput from "../../../lib/CustomTextInput";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { observer } from "mobx-react";
import HorizontalLine from "../../../lib/HorizontalLine";

interface ITitleAndBlurb {
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const TitleAndBlurb = (props: ITitleAndBlurb) => {
    const catalogStore = useCatalogStore();

    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                title
            </CustomText>
            <CustomTextInput
                defaultValue={catalogStore.activeProduct.title}
                placeholder="PlayStation 5"
                onChangeText={(text: string) => {
                    props.setHasChanged(true);
                    catalogStore.setActiveProductTitle(text);
                }}
                onSubmitEditing={() => Keyboard.dismiss()}
            />
            <CustomText
                fontSize={18}
                font="Bold"
                style={{ marginTop: 27, marginBottom: 12 }}
            >
                blurb
            </CustomText>
            <CustomTextInput
                isLarge
                defaultValue={catalogStore.activeProduct.blurb}
                placeholder="make it special"
                onChangeText={(text: string) => {
                    props.setHasChanged(true);
                    catalogStore.setActiveProductBlurb(text);
                }}
                onSubmitEditing={() => Keyboard.dismiss()}
            />
        </View>
    );
};

export default observer(TitleAndBlurb);
