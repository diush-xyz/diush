import { TouchableOpacity, View, Image, Keyboard } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScreenHeader from "../../lib/ScreenHeader";
import Switcher from "../Dashboard/Switcher";
import HorizontalLine from "../../lib/HorizontalLine";
import {
    MAX_WIDTH,
    PRODUCT_BOTTOM_SHEET_SNAP_POINTS,
} from "../../../utils/constants";
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
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PriceEditSelectorContent from "./askingPrice/PriceEditSelectorContent";
import { deriveProductConditionFromDb } from "../../../utils/productCondition.util";

const EditProductHome = () => {
    const catalogStore = useCatalogStore();
    const sheetRef = React.useRef<BottomSheet>(null);

    const [imageURL, setImageURL] = React.useState<string>(
        catalogStore.activeProduct.imageURL
    );

    const [title, setTitle] = React.useState<string>(
        catalogStore.activeProduct.title
    );

    const [blurb, setBlurb] = React.useState<string>(
        catalogStore.activeProduct.blurb
    );

    const [askingPrice, setAskingPrice] = React.useState<number>(
        catalogStore.activeProduct.askingPrice
    );

    const [condition, setCondition] = React.useState<number>(
        catalogStore.activeProduct.condition
    );

    const [additionalInfo, setAdditionalInfo] = React.useState<string>(
        catalogStore.activeProduct.additionalInfo
    );

    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

    const evaluateHasChanged = () => {
        if (
            title !== catalogStore.activeProduct.title ||
            blurb !== catalogStore.activeProduct.blurb ||
            askingPrice !== catalogStore.activeProduct.askingPrice ||
            condition !== catalogStore.activeProduct.condition ||
            additionalInfo !== catalogStore.activeProduct.additionalInfo ||
            imageURL !== catalogStore.activeProduct.imageURL
        ) {
            setHasChanged(true);
        } else {
            setHasChanged(false);
        }
    };

    React.useEffect(() => {
        evaluateHasChanged();
    }, [title, blurb, askingPrice, condition, additionalInfo, imageURL]);

    const save = async () => {
        const productRef = doc(db, "products", catalogStore.activeProduct.id);

        await updateDoc(productRef, {
            title,
            blurb,
            askingPrice,
            condition,
            imageURL,
            additionalInfo,
        }).then(() => {
            //update the state for the re-render
            catalogStore.setActiveProductTitle(title);
            catalogStore.setActiveProductBlurb(blurb);
            catalogStore.setActiveProductAskingPrice(askingPrice);
            catalogStore.setActiveProductCondition(
                deriveProductConditionFromDb(condition)
            );
            catalogStore.setActiveProductImageURL(imageURL);
            catalogStore.setActiveProductAdditionalInfo(additionalInfo);
            //take the user back to the product view home screen (individual)
            catalogStore.setStatus(CatalogStatus.VIEW);
        });
    };

    return (
        <>
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
                        if (hasChanged) {
                            catalogStore.setIsUnsavedChangesModalOpen(true);
                            Keyboard.dismiss();
                        } else {
                            catalogStore.setStatus(CatalogStatus.VIEW);
                        }
                    }}
                    title="edit listing"
                    subtitle="my catalog"
                    button
                    buttonText="save"
                    onButtonPress={() => save()}
                    buttonDisabled={!hasChanged}
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
                        <ImageSection
                            imageURL={imageURL}
                            setImageURL={setImageURL}
                        />
                        <HorizontalLine />
                        <TitleAndBlurb
                            title={title}
                            setTitle={setTitle}
                            blurb={blurb}
                            setBlurb={setBlurb}
                        />
                        <HorizontalLine />
                        <AskingPriceSection askingPrice={askingPrice} />
                        <HorizontalLine />
                        <ConditionAndExtra
                            condition={condition}
                            setCondition={setCondition}
                            additionalInfo={additionalInfo}
                            setAdditionalInfo={setAdditionalInfo}
                        />
                    </View>
                </ProductEditScrollWrapper>
                <WarningConfirmation
                    icon={<CompactIcon />}
                    title="are you sure?"
                    desc={`you have unsaved changes. if you\n leave now, they won’t save.`}
                    buttonText="yes, i'm sure"
                    buttonOnClick={() => {
                        catalogStore.setIsUnsavedChangesModalOpen(false);
                        catalogStore.setStatus(CatalogStatus.VIEW);
                    }}
                    footerText="nope, cancel"
                    onFooterClick={() => {
                        catalogStore.setIsUnsavedChangesModalOpen(false);
                    }}
                    visible={catalogStore.isUnsavedChangesModalOpen}
                />
            </View>
            {catalogStore.isPriceEditPopupOpen && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={PRODUCT_BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() => catalogStore.setIsPriceEditPopupOpen(false)}
                    style={{ borderRadius: 35, overflow: "hidden" }}
                >
                    <PriceEditSelectorContent
                        askingPrice={askingPrice}
                        setAskingPrice={setAskingPrice}
                    />
                </BottomSheet>
            )}
        </>
    );
};

export default observer(EditProductHome);
