import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import CatalogHome from "../../components/catalog/Home";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { CatalogStatus } from "../../@types/GlobalTypes";
import CustomText from "../../components/lib/CustomText";
import { observer } from "mobx-react";
import CreateProductFlow from "./CreateProduct/CreateProduct.flow";
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import {
    BOTTOM_SHEET_SNAP_POINTS,
    PRODUCT_BOTTOM_SHEET_SNAP_POINTS,
} from "../../utils/constants";
import ViewProduct from "../../components/catalog/viewProduct/ViewProduct";
import ImageOverlay from "../../components/catalog/viewProduct/ImageOverlay";
import { useSellerViewProductStore } from "../../state/auth/SellerViewProductStore";
import EditProduct from "./EditProduct/EditProduct.screen";
import PriceInput from "../../components/lib/PriceInput";
import PriceEditSelectorContent from "../../components/catalog/editProduct/askingPrice/PriceEditSelectorContent";

const CatalogScreen = () => {
    const sellerViewProductStore = useSellerViewProductStore();
    const catalogStore = useCatalogStore();

    const sheetRef = React.useRef<BottomSheet>(null);

    const handleSnapPress = React.useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        catalogStore.setStatus(CatalogStatus.CREATE);
    }, []);

    return (
        <>
            {catalogStore.status == CatalogStatus.EDIT ? (
                <EditProduct />
            ) : (
                <CatalogHome />
            )}
            {catalogStore.status === CatalogStatus.CREATE && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() =>
                        catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                    }
                >
                    <CreateProductFlow />
                </BottomSheet>
            )}
            {catalogStore.status === CatalogStatus.VIEW && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() => {
                        catalogStore.setStatus(CatalogStatus.ACTIVE_DASH);
                        // //clear the state here (in case it's null in the next one, meaning there have been no offers yet)
                        sellerViewProductStore.setHighestOfferAmount(null);
                    }}
                    style={{ borderRadius: 35, overflow: "hidden" }}
                >
                    <ViewProduct />
                </BottomSheet>
            )}
        </>
    );
};

export default observer(CatalogScreen);
