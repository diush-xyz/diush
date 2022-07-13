import { View, Text, ImageBackground, FlatList } from "react-native";
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
import { v4 as uuid } from "uuid";

const CatalogScreen = () => {
    const utilStore = useUtilStore();
    const theme = useTheme();

    const MOCK_DATA: IProductCard[] = [
        {
            id: "0de763b0-939a-415c-b879-987e2f120034",
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            id: "hfhj0de763b0-939a-415c-b879-987e2f120034",
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            id: "0de763b0-939a-415c-b879fff",
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan m",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            id: "0de763b0-939a-diushhhh-b879fff",
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            id: "0de763b0-939a-415c-yuyuyuyuyuyuy",
            uri: "https://reactjs.org/logo-og.png",
            title: "Jordan Jersey",
            desc: "Perfect conditions. Only worn once.",
            askingPrice: 90,
            highestOffer: 105,
        },
        {
            id: "0de763b0-939a-hjfhjfhjhdjfhj-b879fff",
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
                    // display: "flex",
                    // justifyContent: "center",
                    // flexDirection: "row",
                    flex: 1,
                    // flexWrap: "wrap",
                    marginTop: 12,
                    // overflow: "scroll",
                }}
            >
                <FlatList
                    data={MOCK_DATA}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ProductCard {...item} />}
                    showsVerticalScrollIndicator={false}
                />

                {/* {MOCK_DATA.map((elem, index) => (
                    // make the marginLeft or marginRight of the Product Card based on if the index is 0, even, or odd
                    <ProductCard
                        key={index}
                        {...elem}
                        // marginLeft={index % 2 === 0 ? 0 : 5}
                        // marginRight={index % 2 === 0 ? 5 : 0}
                        // marginTop={index !== 0 || 1 ? 10 : 0}
                    />
                ))} */}
                {/* <FlatList
                    data={MOCK_DATA}
                    renderItem={({ item }) => <ProductCard {...item} />}
                    showsVerticalScrollIndicator={false}
                    // keyExtractor={(item, index) => index.toString()}
                /> */}
            </View>
        </View>
    );
};

export default CatalogScreen;
