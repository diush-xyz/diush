import React from "react";
import { View } from "react-native";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { observer } from "mobx-react";

const SearchScreen = () => {
    const utilStore = useUtilStore();
    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                backArrow
                backArrowOnPress={() =>
                    utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                }
                title="search listings"
            />
        </View>
    );
};

export default observer(SearchScreen);
