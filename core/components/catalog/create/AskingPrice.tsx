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

const AskingPrice = () => {
    const createProductStore = useCreateProductStore();
    const NUM_PAD_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"];
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
                totalSteps={8}
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
                    <CustomText
                        font="Heavy"
                        fontSize={56}
                        style={{ marginBottom: 45 }}
                    >
                        $150
                    </CustomText>
                    <FlatList
                        data={NUM_PAD_DATA}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginBottom: 15,
                        }}
                        renderItem={({ item, index }) => (
                            <View style={{ height: 32, width: 32 }}>
                                {item === "del" ? (
                                    <DeleteIcon onPress={() => null} />
                                ) : (
                                    <CustomText
                                        secondary
                                        fontSize={22}
                                        textAlign="center"
                                    >
                                        {item}
                                    </CustomText>
                                )}
                            </View>
                        )}
                        style={{ width: "100%", maxWidth: 247 }}
                    />
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
                            // setFirstTime(false);
                            // if (allClear) {
                            //     createProductStore.setCurrentStep(1);
                            // }
                            null;
                        }}
                        footer
                        // disabled={!allClear && !firstTime}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() =>
                            createProductStore.setCurrentStep(
                                createProductStore.currentStep - 1
                            )
                        }
                    />
                </FlowTemplate>
            </View>
        </BottomSheetView>
    );
};

export default observer(AskingPrice);