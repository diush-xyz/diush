import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";

const SettingsPayments = () => {
    return (
        <View>
            <CustomText>This is the best.</CustomText>
        </View>
    );
};

export default observer(SettingsPayments);
