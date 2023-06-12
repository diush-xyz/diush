import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PopupHeader from "../../lib/PopupHeader";
import { View } from "react-native";
import FlowTemplate from "../../lib/FlowTemplate";
import LargeButton from "../../lib/LargeButton";
import PriceInput from "../../lib/PriceInput";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import { usePlaceOfferStore } from "../../../state/buy/PlaceOffer.store";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import { BuyFlowStatus } from "../../../@types/GlobalTypes";

const PlaceOffer = () => {
    const scopeProductStore = useScopeProductStore();
    const placeOfferStore = usePlaceOfferStore();
    const buyProductStore = useBuyProductStore();

    const [price, setPrice] = React.useState<string>(
        scopeProductStore.fetchedActiveProduct.askingPrice.toString()
    );

    return (
        <>
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
                        title="place an offer."
                        desc={`tthis is the best.`}
                        descAndChildMargin={15}
                    >
                        <PriceInput price={price} setPrice={setPrice} />
                        <LargeButton
                            title="looks good!"
                            onPress={() => {
                                const parsedPrice = Number(price);
                                if (parsedPrice > 0) {
                                    placeOfferStore.setOfferAmount(parsedPrice);
                                    buyProductStore.setStatus(
                                        BuyFlowStatus.SUCCESS
                                    );
                                }
                            }}
                            footer
                            disabled={
                                Number(price) ==
                                scopeProductStore.fetchedActiveProduct
                                    .askingPrice
                            }
                            // disabled={!allClear && !firstTime}
                            footerButtonTitle="cancel"
                            footerButtonOnPress={() => {
                                buyProductStore.setStatus(BuyFlowStatus.SCOPE);
                            }}
                        />
                    </FlowTemplate>
                </View>
            </BottomSheetView>
        </>
    );
};

export default PlaceOffer;
