import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import CustomText from "../../../lib/CustomText";
import { GLOBAL_STYLES } from "../../../../@types/GlobalStyles";
import { PRODUCT_BOTTOM_SHEET_SNAP_POINTS } from "../../../../utils/constants";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import { useTheme } from "../../../../utils/useTheme.util";

const NewProductOptions = () => {
    const sellerViewProductStore = useSellerViewProductStore();
    const theme = useTheme();
    const sheetRef = React.useRef<BottomSheet>(null);

    // renders
    return (
        <BottomSheet
            handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
            handleStyle={GLOBAL_STYLES.handleStyle}
            ref={sheetRef}
            snapPoints={["92%"]}
            enablePanDownToClose={true}
            onClose={() => sellerViewProductStore.setProductOptionsPopup()}
            style={{ borderRadius: 35, overflow: "hidden", zIndex: 1000 }}
        >
            <BottomSheetView
                style={{
                    flex: 1,
                    backgroundColor: theme.popupBackground,
                    zIndex: 1000,
                }}
            >
                <CustomText>The best</CustomText>
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
});

export default NewProductOptions;
