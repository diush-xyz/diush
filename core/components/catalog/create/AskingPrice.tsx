import { View, Text, FlatList } from "react-native";
import React from "react";
import LargeButton from "../../lib/LargeButton";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import ProductCard from "../Dashboard/ProductCard";
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
import PriceInput from "../../lib/PriceInput";

const AskingPrice = () => {
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
                currentStep={2}
                totalSteps={7}
            />
            <View style={{ width: "100%", marginTop: 40 }}>
                <FlowTemplate
                    circleEmoji="💰"
                    title="how much are you seeking?"
                    desc={
                        "this is the starting point for people\n when they come across your listing."
                    }
                    descAndChildMargin={15}
                >
                    <PriceInput price={price} setPrice={setPrice} />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginVertical: 24,
                        }}
                    >
                        <InfoIcon />
                        <CustomText secondary style={{ marginLeft: 5 }}>
                            learn more about offers
                        </CustomText>
                    </View>
                    <LargeButton
                        title="continue"
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
                        disabled={Number(price) <= 0}
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

export default observer(AskingPrice);
