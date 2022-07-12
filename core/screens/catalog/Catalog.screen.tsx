import { View, Text } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText";
import PopupHeader from "../../components/lib/PopupHeader";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import { useTheme } from "../../utils/useTheme.util";
import CustomTextInput from "../../components/lib/CustomTextInput";
import SearchIcon from "../../icons/catalog";

const CatalogScreen = () => {
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
                title="my catalog"
            />
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    borderBottomColor: theme.secondary,
                    borderBottomWidth: 1,
                    marginTop: 15,
                    marginBottom: 22,
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        paddingBottom: 12,
                        paddingHorizontal: 8,
                    }}
                >
                    <CustomText primary textAlign="center">
                        active
                    </CustomText>
                    <View
                        style={{
                            height: 3,
                            backgroundColor: theme.accent,
                            width: "100%",
                            borderRadius: 3,
                            position: "absolute",
                            bottom: 0,
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        paddingBottom: 12,
                    }}
                >
                    <CustomText primary>active</CustomText>
                </View>
            </View>
            <CustomTextInput
                placeholder="search my products"
                onChangeText={() => null}
                isSearch
            />
        </View>
    );
};

export default CatalogScreen;
