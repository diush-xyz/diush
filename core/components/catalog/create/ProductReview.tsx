import { View, Text, FlatList } from "react-native";
import React from "react";
import LargeButton from "../../lib/LargeButton";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import ProductCard from "../ProductCard";
import CustomText from "../../lib/CustomText";
import FlowTemplate from "../../lib/FlowTemplate";
import CustomTextInput from "../../lib/CustomTextInput";
import DeleteIcon from "../../../icons/catalog/Delete";
import InfoIcon from "../../../icons/common/info";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";
import PopupHeader from "../../lib/PopupHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { CatalogStatus } from "../../../@types/GlobalTypes";

const ProductReview = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const [price, setPrice] = React.useState<string>(
        createProductStore.askingPrice.toString()
    );

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="create listing"
                backArrow
                backArrowOnPress={() =>
                    createProductStore.setCurrentStep(
                        createProductStore.currentStep - 1
                    )
                }
                subtitle="my catalog"
                progressIndicator
                currentStep={7}
                totalSteps={7}
            />
            <View style={{ width: "100%", marginTop: 40 }}>
                <FlowTemplate
                    circleEmoji="💰"
                    title="we just have to check..."
                    desc={
                        "would you like to add this item to\n your catalog? this will allow you to\n share its link with your friends."
                    }
                >
                    <LargeButton
                        title="post"
                        onPress={() => {
                            const parsedPrice = Number(price);
                            if (parsedPrice > 0) {
                                createProductStore.setAskingPrice(parsedPrice);
                                createProductStore.setCurrentStep(
                                    createProductStore.currentStep + 1
                                );
                            }
                        }}
                        footer
                        // disabled={Number(price) <= 0}
                        // disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() => {
                            createProductStore.cancel();
                            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH);
                        }}
                    />
                </FlowTemplate>
            </View>
        </BottomSheetView>
    );
};

export default observer(ProductReview);
