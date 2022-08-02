import { View, Text } from "react-native";
import React from "react";
import CatalogHome from "../../components/catalog/Home";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { CatalogStatus } from "../../@types/GlobalTypes";
import CustomText from "../../components/lib/CustomText";
import { observer } from "mobx-react";
import CreateProductFlow from "./CreateProduct/CreateProduct.flow";
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../utils/constants";

const CatalogScreen = () => {
    const catalogStore = useCatalogStore();

    const sheetRef = React.useRef<BottomSheet>(null);

    const handleSnapPress = React.useCallback(index => {
        sheetRef.current?.snapToIndex(index);
        catalogStore.setStatus(CatalogStatus.CREATE);
    }, []);

    return (
        <>
            <CatalogHome />
            {catalogStore.status === CatalogStatus.CREATE && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={BOTTOM_SHEET_SNAP_POINTS}
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
                    snapPoints={BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() =>
                        catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                    }
                >
                    <CustomText accent>View</CustomText>
                </BottomSheet>
            )}
        </>
    );
};

export default observer(CatalogScreen);
