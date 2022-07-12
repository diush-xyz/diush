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
import ProductCard, {
    IProductCard,
} from "../../components/catalog/ProductCard";

const CatalogScreen = () => {
    const utilStore = useUtilStore();
    const theme = useTheme();

    const MOCK_DATA: IProductCard[] = [
        {
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
    ];

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
            {/*TODO: Add logic for properly making the marginLeft or marginRight of the Product Card based on if the index is 0, even, or odd/*/}
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: "wrap",
                    marginTop: 12,
                }}
            >
                {MOCK_DATA.map((elem, idx) => (
                    // make the marginLeft or marginRight of the Product Card based on if the index is 0, even, or odd
                    <ProductCard
                        key={idx}
                        {...elem}
                        marginLeft={idx % 2 === 0 ? 0 : 5}
                        marginRight={idx % 2 === 0 ? 5 : 0}
                        marginTop={idx !== 0 || 1 ? 10 : 0}
                    />
                ))}
            </View>
        </View>
    );
};

export default CatalogScreen;
