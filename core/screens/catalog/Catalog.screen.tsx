import { View, Text, ImageBackground, FlatList } from "react-native";
import React from "react";
import CustomText from "../../components/lib/CustomText";
import PopupHeader from "../../components/lib/PopupHeader";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import { useTheme } from "../../utils/useTheme.util";
import CustomTextInput from "../../components/lib/CustomTextInput";
import SearchIcon from "../../icons/catalog/Search";
import Switcher from "../../components/catalog/Switcher";
import { truncate } from "../../utils/truncate.util";
import ProductCard, {
    IProductCard,
} from "../../components/catalog/ProductCard";
import { v4 as uuid } from "uuid";
import WandIcon from "../../icons/catalog/Wand";
import CreateProductButton from "../../components/catalog/CreateProductButton";
import LargeButton from "../../components/lib/LargeButton";
import { createProductInDb } from "../../utils/products.util";
import { auth } from "../../../config/firebase";

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
            askingPrice: 80,
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
            <LargeButton
                title="Create a product"
                onPress={() => {
                    createProductInDb({
                        id: "thisisanid",
                        linkedUID: auth.currentUser?.uid,
                        title: "This is my new product",
                        blurb: "Woooo, this is the blurb babyyy",
                        askingPrice: 100,
                    })
                        .then(() => console.log("Created product in DB!"))
                        .catch(err =>
                            console.error("something went wrong: " + err)
                        );
                }}
            />
            <CustomTextInput
                placeholder="search my products"
                onChangeText={() => null}
                isSearch
            />
            <View
                style={{
                    flex: 1,
                    marginTop: 22,
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
                    renderItem={({ item, index }) => (
                        <ProductCard
                            {...item}
                            marginLeft={index % 2 === 0 ? 0 : 5}
                            marginRight={index % 2 === 0 ? 5 : 0}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {/*make a button in the bottom right corner of the screen that has the shape of a circle and a plus sign*/}
            <CreateProductButton />
        </View>
    );
};

export default CatalogScreen;
