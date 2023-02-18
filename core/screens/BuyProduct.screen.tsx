import React from "react";
import { View } from "react-native";
import CustomText from "../components/lib/CustomText";
import { observer } from "mobx-react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../@types/GlobalStyles";
import { CatalogStatus } from "../@types/GlobalTypes";
import ViewProduct from "../components/catalog/viewProduct/ViewProduct";
import { PRODUCT_BOTTOM_SHEET_SNAP_POINTS } from "../utils/constants";
import BuyProductContent from "../components/buy/BuyProduct";

const BuyProductScreen = () => {
    const sheetRef = React.useRef<BottomSheet>(null);
    return (
        <BottomSheet
            handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
            handleStyle={GLOBAL_STYLES.handleStyle}
            ref={sheetRef}
            snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
            enablePanDownToClose={true}
            onClose={() => {
                // catalogStore.setStatus(CatalogStatus.ACTIVE_DASH);
                // // //clear the state here (in case it's null in the next one, meaning there have been no offers yet)
                // sellerViewProductStore.setHighestOfferAmount(null);
                console.log("mmm");
            }}
            style={{ borderRadius: 35, overflow: "hidden" }}
        >
            <BuyProductContent />
        </BottomSheet>
    );
};

export default observer(BuyProductScreen);
