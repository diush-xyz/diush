import React from "react";
import { View } from "react-native";
import CustomText from "../../components/lib/CustomText";
import { observer } from "mobx-react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { CatalogStatus, LoggedInScreen } from "../../@types/GlobalTypes";
import ViewProduct from "../../components/catalog/viewProduct/ViewProduct";
import { PRODUCT_BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";
import { useUtilStore } from "../../state/Util.store";
import ScopeProduct from "../../components/buy/scopeProduct/ScopeProduct";

const BuyProductScreen = () => {
    const sheetRef = React.useRef<BottomSheet>(null);
    const utilStore = useUtilStore();

    return (
        <BottomSheet
            handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
            handleStyle={GLOBAL_STYLES.handleStyle}
            ref={sheetRef}
            snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
            enablePanDownToClose={true}
            onClose={() => {
                utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME);
                // //clear the state here (in case it's null in the next one, meaning there have been no offers yet)
                // sellerViewProductStore.setHighestOfferAmount(null);
            }}
            style={{ borderRadius: 35, overflow: "hidden" }}
        >
            <ScopeProduct />
        </BottomSheet>
    );
};

export default observer(BuyProductScreen);
