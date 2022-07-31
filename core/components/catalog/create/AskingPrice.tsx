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

const AskingPrice = () => {
    const createProductStore = useCreateProductStore();
    const NUM_PAD_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"];
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
                        ${price}
                    </CustomText>
                    <FlatList
                        data={NUM_PAD_DATA}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginBottom: 15,
                        }}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    //append the value of item to price
                                    //if item is del, remove the last character of price
                                    //if item is ., add a . if there is not already one
                                    //if item is 0, add a 0 if there is not already one
                                    //if item is 1-9, add the number
                                    if (item === "del") {
                                        setPrice(price.slice(0, -1));
                                    } else if (item === ".") {
                                        if (!price.includes(".")) {
                                            setPrice(price + ".");
                                        }
                                    } else if (item === 0) {
                                        if (price !== "0") {
                                            setPrice(price + "0");
                                        }
                                    } else {
                                        if (price === "0") {
                                            setPrice(item.toString());
                                        } else {
                                            setPrice(price + item.toString());
                                        }
                                    }
                                }}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                }}
                            >
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
                            </TouchableOpacity>
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
