import { View, Text, FlatList } from "react-native";
import React from "react";
import LargeButton from "../../lib/LargeButton";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import { observer } from "mobx-react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import ProductCard from "../ProductCard";
import CustomText from "../../lib/CustomText";

const AskingPrice = () => {
    const createProductStore = useCreateProductStore();
    const NUM_PAD_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "del"];
    return (
        <View style={GLOBAL_STYLES.page}>
            <FlatList
                data={NUM_PAD_DATA}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 15,
                }}
                renderItem={({ item, index }) => (
                    <View style={{ height: 25, width: 25 }}>
                        <CustomText secondary fontSize={22} textAlign="center">
                            {item}
                        </CustomText>
                    </View>
                )}
                style={{ width: "100%", maxWidth: 247 }}
            />
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
                footerButtonOnPress={() => createProductStore.cancel()}
            />
        </View>
    );
};

export default observer(AskingPrice);
