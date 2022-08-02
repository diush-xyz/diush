import { View, Text, FlatList, Image } from "react-native";
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
import { useTheme } from "../../../utils/useTheme.util";
import { LinearTextGradient } from "react-native-text-gradient";
import { createProductInDb } from "../../../utils/products.util";
import { auth } from "../../../../config/firebase";

const ProductReview = () => {
    const theme = useTheme();
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
                    circleEmoji="🛑"
                    title="we just have to check..."
                    desc={
                        "would you like to add this item to\n your catalog? this will allow you to\n share its link with your friends."
                    }
                >
                    <View
                        style={{
                            padding: 12,
                            borderRadius: 12,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            marginBottom: 32,
                        }}
                    >
                        <View
                            style={{
                                justifyContent:
                                    createProductStore.productImageURL == ""
                                        ? "center"
                                        : null,
                                width: 300,
                                height: 166,
                                borderStyle: "dashed",
                                borderWidth: 1,
                                borderRadius: 12,
                                borderColor: theme.secondary,
                                marginBottom: 23,
                            }}
                        >
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: "cover",
                                    justifyContent: "center",
                                    borderRadius: 12,
                                }}
                                source={{
                                    uri: createProductStore.productImageURL,
                                }}
                            />
                        </View>
                        <CustomText
                            font="Heavy"
                            fontSize={22}
                            style={{ marginBottom: 6, letterSpacing: 1 }}
                        >
                            {createProductStore.productName}
                        </CustomText>
                        <CustomText
                            accent
                            font="Heavy"
                            fontSize={18}
                            style={{ marginBottom: 12 }}
                        >
                            ${createProductStore.askingPrice}
                        </CustomText>
                        <CustomText
                            secondary
                            font="Bold"
                            style={{ marginBottom: 5 }}
                        >
                            {createProductStore.blurb}
                        </CustomText>
                        <CustomText secondary font="Heavy">
                            {createProductStore.condition}
                        </CustomText>
                    </View>
                    <LargeButton
                        title="post"
                        onPress={() => {
                            createProductInDb({
                                id: createProductStore.productId,
                                linkedUID: auth.currentUser?.uid,
                                title: createProductStore.productName,
                                blurb: createProductStore.blurb,
                                askingPrice: createProductStore.askingPrice,
                                imageURL: createProductStore.productImageURL,
                            })
                                .then(() => {
                                    console.log("Created product in DB!");
                                    createProductStore.cancel();
                                    catalogStore.setStatus(
                                        CatalogStatus.ACTIVE_DASH
                                    );
                                })
                                .catch(err =>
                                    console.error(
                                        "something went wrong: " + err
                                    )
                                );
                        }}
                        footer
                        // disabled={Number(price) <= 0}
                        // disabled={!allClear && !firstTime}
                        footerButtonTitle="back to editing"
                        footerButtonOnPress={() => {
                            createProductStore.setCurrentStep(0);
                        }}
                    />
                </FlowTemplate>
            </View>
        </BottomSheetView>
    );
};

export default observer(ProductReview);
