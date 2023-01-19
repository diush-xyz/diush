import React from "react";
import { View } from "react-native";
import CustomText from "../components/lib/CustomText";
import { observer } from "mobx-react";

const BuyProductScreen = () => {
    return (
        <View>
            <CustomText>Buy product</CustomText>
        </View>
    );
};

export default observer(BuyProductScreen);
