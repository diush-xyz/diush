import { TouchableOpacity, View, Image } from "react-native";
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

const EditProductHome = () => {
    const catalogStore = useCatalogStore();
    const [hasChanged, setHasChanged] = React.useState<boolean>(false);

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
                backArrowOnPress={() =>
                    catalogStore.setStatus(CatalogStatus.VIEW)
                }
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
                    <ImageSection setHasChanged={setHasChanged} />
                    <HorizontalLine />
                    <TitleAndBlurb setHasChanged={setHasChanged} />
                    <HorizontalLine />
                    <AskingPriceSection />
                    <HorizontalLine />
                    <ConditionAndExtra setHasChanged={setHasChanged} />
                </View>
            </ProductEditScrollWrapper>
        </View>
    );
};

export default observer(EditProductHome);
