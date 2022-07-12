import { View, Text, ImageBackground } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText";
import PopupHeader from "../../components/lib/PopupHeader";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import { useTheme } from "../../utils/useTheme.util";
import CustomTextInput from "../../components/lib/CustomTextInput";
import SearchIcon from "../../icons/catalog";
import Switcher from "../../components/catalog/Switcher";
import { truncate } from "../../utils/truncate.util";

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
            <Switcher />
            <CustomTextInput
                placeholder="search my products"
                onChangeText={() => null}
                isSearch
            />
            {/* <ImageBackground
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                style={{
                    height: 232,
                    width: 164,
                    borderRadius: 8,
                    //DO NOT REMOVE: this property is required for the borderRaduis to be visible. For reference, see: https://reactnative.dev/docs/view-style-props#borderradius
                    overflow: "hidden",
                }}
            >
                <CustomText primary>Jordan Jersey</CustomText>
            </ImageBackground> */}
            <View>
                {/*@ts-ignore*/}
                <ImageBackground
                    source={{ uri: "https://reactjs.org/logo-og.png" }}
                    borderRadius={8}
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: 232,
                        width: 164,
                        borderRadius: 8,
                        //DO NOT REMOVE: this property is required for the borderRaduis to be visible. For reference, see: https://reactnative.dev/docs/view-style-props#borderradius
                        overflow: "hidden",
                        paddingTop: 10,
                        paddingHorizontal: 6,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <CustomText primary fontSize={10} font="Heavy">
                                asking price
                            </CustomText>
                            <CustomText accent font="Black" fontSize={18}>
                                $90
                            </CustomText>
                        </View>
                        <View>
                            <CustomText primary fontSize={10} font="Heavy">
                                highest offer
                            </CustomText>
                            <CustomText
                                accent
                                font="Black"
                                fontSize={18}
                                textAlign="right"
                            >
                                $2
                            </CustomText>
                        </View>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            marginBottom: 19,
                        }}
                    >
                        <CustomText primary fontSize={18} font="Black">
                            Jordan Jersey
                        </CustomText>
                        <CustomText primary font="Bold">
                            {truncate("Jordan Jersey is a great product", 23)}
                        </CustomText>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

export default CatalogScreen;
