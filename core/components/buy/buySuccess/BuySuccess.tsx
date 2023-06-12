import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import { usePlaceOfferStore } from "../../../state/buy/PlaceOffer.store";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import CustomText from "../../lib/CustomText";
import LargeButton from "../../lib/LargeButton/LargeButton.ui";
import { useUtilStore } from "../../../state/Util.store";
import { BuyFlowStatus, LoggedInScreen } from "../../../@types/GlobalTypes";
import { observer } from "mobx-react";

const BuySuccess = () => {
    const scopeProductStore = useScopeProductStore();
    const placeOfferStore = usePlaceOfferStore();
    const buyProductStore = useBuyProductStore();
    const utilStore = useUtilStore();

    const [price, setPrice] = React.useState<string>(
        scopeProductStore.fetchedActiveProduct.askingPrice.toString()
    );

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
                <CustomText>
                    Success! You offered {placeOfferStore.offerAmount}.
                </CustomText>
                <LargeButton
                    title="close"
                    onPress={() => {
                        utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME);
                        //clear stuff:
                        placeOfferStore.setOfferAmount(0);
                        buyProductStore.setStatus(BuyFlowStatus.SCOPE);
                    }}
                    footer
                    footerButtonTitle="view conversation"
                />
            </BottomSheetView>
        </>
    );
};

export default observer(BuySuccess);
