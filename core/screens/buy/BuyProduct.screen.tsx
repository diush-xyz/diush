import React from "react";
import { View } from "react-native";
import CustomText from "../../components/lib/CustomText";
import { observer } from "mobx-react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import {
    BuyFlowStatus,
    CatalogStatus,
    LoggedInScreen,
} from "../../@types/GlobalTypes";
import ViewProduct from "../../components/catalog/viewProduct/ViewProduct";
import { PRODUCT_BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";
import { useUtilStore } from "../../state/Util.store";
import ScopeProduct from "../../components/buy/scopeProduct/ScopeProduct";
import { useBuyProductStore } from "../../state/buy/BuyProduct.store";
import PlaceOffer from "../../components/buy/placeOffer/PlaceOffer";
import { usePlaceOfferStore } from "../../state/buy/PlaceOffer.store";
import BuySuccess from "../../components/buy/buySuccess/BuySuccess";

const BuyProductScreen = () => {
    const sheetRef = React.useRef<BottomSheet>(null);
    const utilStore = useUtilStore();
    const buyProductStore = useBuyProductStore();
    const placeOfferStore = usePlaceOfferStore();

    const populateScreen = () => {
        switch (buyProductStore.status) {
            case BuyFlowStatus.SCOPE:
                return <ScopeProduct />;
            case BuyFlowStatus.PLACE_OFFER:
                return <PlaceOffer />;
            case BuyFlowStatus.SUCCESS:
                return <BuySuccess />;
        }
    };

    return (
        <>
            <BottomSheet
                handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                handleStyle={GLOBAL_STYLES.handleStyle}
                ref={sheetRef}
                snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
                enablePanDownToClose={true}
                onClose={() => {
                    utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME);
                    //clear the state here
                    buyProductStore.setStatus(BuyFlowStatus.SCOPE);
                }}
                style={{ borderRadius: 35, overflow: "hidden" }}
            >
                {populateScreen()}
            </BottomSheet>
        </>
    );
};

export default observer(BuyProductScreen);
