import React from "react";
import { View } from "react-native";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { observer } from "mobx-react";
import { useTheme } from "../../utils/useTheme.util";
import CustomText from "../../components/lib/CustomText";
import CustomTextInput from "../../components/lib/CustomTextInput";

const SearchScreen = () => {
    const utilStore = useUtilStore();
    const theme = useTheme();

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
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopWidth: 2,
                    borderBottomWidth: 2,
                    borderTopColor: theme.secondary,
                    borderBottomColor: theme.secondary,
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                    marginTop: 20,
                    width: "100%",
                }}
            >
                <CustomText style={{ fontSize: 12, textAlign: "justify" }}>
                    hey there! this feature is sort of a temporary, short-term
                    {`\n`}way of being able to test out the bulk of diush's
                    functionality without having to delay it any further due to
                    having to implement deeplinks. They will come soon! For now,
                    to{"\n"}make an offer for a product, search for it here.
                </CustomText>
            </View>
            <CustomTextInput
                placeholder="angry birds plushie"
                isSearch
                onChangeText={text => console.log(text)}
                marginTop={20}
            />
        </View>
    );
};

export default observer(SearchScreen);
