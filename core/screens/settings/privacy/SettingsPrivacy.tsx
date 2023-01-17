import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/lib/CustomText";
import { observer } from "mobx-react";

const SettingsPrivacy = () => {
    return (
        <View>
            <CustomText>This is the best.</CustomText>
        </View>
    );
};

export default observer(SettingsPrivacy);
