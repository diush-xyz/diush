import React from "react";
import PriceInput from "../../../lib/PriceInput";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { View } from "react-native";
import FlowTemplate from "../../../lib/FlowTemplate";
import PopupHeader from "../../../lib/PopupHeader";
import { observer } from "mobx-react";
import LargeButton from "../../../lib/LargeButton";

const PriceEditSelectorContent = () => {
    const catalogStore = useCatalogStore();
    const [price, setPrice] = React.useState<string>(
        catalogStore.activeProduct.askingPrice.toString()
    );

    return (
        <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
            <PopupHeader
                title="create listing"
                // backArrow
                // backArrowOnPress={() =>
                //     createProductStore.setCurrentStep(
                //         createProductStore.currentStep - 1
                //     )
                // }
                subtitle="my catalog"
            />
            <View style={{ width: "100%", marginTop: 80 }}>
                <FlowTemplate
                    circleEmoji="💰"
                    title="change your asking price"
                    desc={`this is the starting point for people\n when they come across your listing, '${catalogStore.activeProduct.title}'.`}
                    descAndChildMargin={15}
                >
                    <PriceInput price={price} setPrice={setPrice} />
                    <LargeButton
                        title="looks good!"
                        onPress={() => {
                            const parsedPrice = Number(price);
                            if (parsedPrice > 0) {
                                catalogStore.setActiveProductAskingPrice(
                                    parsedPrice
                                );
                                catalogStore.setHasChanged(true);
                                catalogStore.setIsPriceEditPopupOpen(false);
                            }
                        }}
                        footer
                        disabled={
                            Number(price) ==
                            catalogStore.activeProduct.askingPrice
                        }
                        // disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() => {
                            catalogStore.setIsPriceEditPopupOpen(false);
                        }}
                    />
                </FlowTemplate>
            </View>
        </BottomSheetView>
    );
};

export default observer(PriceEditSelectorContent);
