import React from "react";
import { View } from "react-native";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { observer } from "mobx-react";
import CustomDMScreenHeader from "../../../components/home/Conversation/DMScreen/CustomDMScreenHeader";

const DMScreen = () => {
    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <CustomDMScreenHeader />
        </View>
    );
};

export default observer(DMScreen);
