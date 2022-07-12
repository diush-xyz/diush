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
import ProductCard from "../../components/catalog/ProductCard";

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
            {/*TODO: Add logic for properly making the marginLeft or marginRight of the Product Card based on if the index is 0, even, or odd/*/}
            <View style={{ display: "flex", flexDirection: "row" }}>
                <ProductCard
                    uri="https://reactjs.org/logo-og.png"
                    title="Jordan Jersey"
                    desc="Perfect conditions. Only worn once."
                    askingPrice={90}
                    highestOffer={105}
                    marginRight={5}
                />
                <ProductCard
                    uri="https://reactjs.org/logo-og.png"
                    title="Jordan Jersey"
                    desc="Perfect conditions. Only worn once."
                    askingPrice={90}
                    highestOffer={105}
                    marginLeft={5}
                />
            </View>
        </View>
    );
};

export default CatalogScreen;
