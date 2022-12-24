import { TouchableOpacity, View, Image, Keyboard } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScreenHeader from "../../lib/ScreenHeader";
import Switcher from "../Dashboard/Switcher";
import HorizontalLine from "../../lib/HorizontalLine";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import ImageSection from "./ImageSection";
import CustomTextInput from "../../lib/CustomTextInput";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import TitleAndBlurb from "./TitleAndBlurb";
import ProductEditScrollWrapper from "./ProductEditScrollWrapper";
import AskingPrice from "../create/AskingPrice";
import AskingPriceSection from "./askingPrice";
import ConditionAndExtra from "./ConditionAndExtra";
import WarningConfirmation from "../../lib/Modals/WarningConfirmation";
import CompactIcon from "../viewProduct/CustomDeleteConfirmation/CompactIcon";

const EditProductHome = () => {
    const catalogStore = useCatalogStore();

    const save = async () => {
        const productRef = doc(db, "products", catalogStore.activeProduct.id);

        await updateDoc(productRef, {
            title: catalogStore.activeProduct.title,
            blurb: catalogStore.activeProduct.blurb,
            askingPrice: catalogStore.activeProduct.askingPrice,
            condition: catalogStore.activeProduct.condition,
            additionalInfo: catalogStore.activeProduct.additionalInfo,
        }).then(() => {
            catalogStore.setStatus(CatalogStatus.VIEW);
        });
    };

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() => {
                    if (catalogStore.hasChanged) {
                        catalogStore.setIsUnsavedChangesModalOpen(true);
                        Keyboard.dismiss();
                    } else {
                        catalogStore.setStatus(CatalogStatus.VIEW);
                        catalogStore.setHasChanged(false);
                    }
                }}
                title="edit listing"
                subtitle="my catalog"
                button
                buttonText="save"
                onButtonPress={() => save()}
                buttonDisabled={!catalogStore.hasChanged}
                paddingBottom={16}
            />
            <ProductEditScrollWrapper>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: MAX_WIDTH,
                    }}
                >
                    <HorizontalLine marginVertical={0} />
                    <ImageSection />
                    <HorizontalLine />
                    <TitleAndBlurb />
                    <HorizontalLine />
                    <AskingPriceSection />
                    <HorizontalLine />
                    <ConditionAndExtra />
                </View>
            </ProductEditScrollWrapper>
            <WarningConfirmation
                icon={<CompactIcon />}
                title="are you sure?"
                desc={`you have unsaved changes. if you\n leave now, they won’t save.`}
                buttonText="i understand, do it"
                buttonOnClick={() => {
                    catalogStore.setIsUnsavedChangesModalOpen(false);
                    catalogStore.setStatus(CatalogStatus.VIEW);
                    catalogStore.setHasChanged(false);
                }}
                footerText="nope, cancel"
                onFooterClick={() => {
                    catalogStore.setIsUnsavedChangesModalOpen(false);
                }}
                visible={catalogStore.isUnsavedChangesModalOpen}
            />
        </View>
    );
};

export default observer(EditProductHome);
