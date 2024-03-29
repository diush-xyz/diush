import { View, FlatList } from "react-native";
import React from "react";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import { useTheme } from "../../utils/useTheme.util";
import CustomTextInput from "../../components/lib/CustomTextInput";
import Switcher from "./Dashboard/Switcher";
import ProductCard from "./Dashboard/ProductCard";
import CreateProductButton from "./Dashboard/CreateProductButton";
import { auth, db } from "../../../config/firebase";
import {
    query,
    collection,
    onSnapshot,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { observer } from "mobx-react";
import EmptyCatalogView from "./EmptyCatalogView";
import { MAX_WIDTH } from "../../utils/constants";
import CustomLoader from "../lib/CustomLoader";

const CatalogHome = () => {
    const catalogStore = useCatalogStore();
    const utilStore = useUtilStore();
    const theme = useTheme();
    const [myProducts, setMyProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [activeProducts, setActiveProducts] = React.useState([]);
    const [soldProducts, setSoldProducts] = React.useState([]);

    // const MOCK_DATA: IProductCard[] = [
    //     {
    //         id: "0de763b0-939a-415c-b879-987e2f120034",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan Jersey",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 90,
    //         highestOffer: 105,
    //     },
    //     {
    //         id: "hfhj0de763b0-939a-415c-b879-987e2f120034",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan Jersey",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 90,
    //         highestOffer: 105,
    //     },
    //     {
    //         id: "0de763b0-939a-415c-b879fff",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan m",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 90,
    //         highestOffer: 105,
    //     },
    //     {
    //         id: "0de763b0-939a-diushhhh-b879fff",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan Jersey",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 90,
    //         highestOffer: 105,
    //     },
    //     {
    //         id: "0de763b0-939a-415c-yuyuyuyuyuyuy",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan Jersey",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 80,
    //         highestOffer: 105,
    //     },
    //     {
    //         id: "0de763b0-939a-hjfhjfhjhdjfhj-b879fff",
    //         uri: "https://reactjs.org/logo-og.png",
    //         title: "Jordan Jersey",
    //         desc: "Perfect conditions. Only worn once.",
    //         askingPrice: 90,
    //         highestOffer: 105,
    //     },
    // ];

    const fetchProducts = async () => {
        try {
            const q = query(
                collection(db, "products"),
                where("linkedUID", "==", auth.currentUser?.uid),
                orderBy("createdAt") // Add orderBy to sort by createdAt in descending order
            );

            const querySnapshot = await getDocs(q);
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            // Sort the fetched array in descending order based on createdAt
            fetched.sort((a, b) => b.createdAt - a.createdAt);

            setMyProducts(fetched);
            setLoading(false);
        } catch (error) {
            console.error("An error occurred fetching products:", error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    React.useEffect(() => {
        if (catalogStore.triggerRefresh) {
            setLoading(true);
            fetchProducts();
            catalogStore.setTriggerRefresh(false);
        }
    }, [catalogStore.triggerRefresh]);

    React.useEffect(() => {
        if (myProducts.length > 0 && !loading) {
            const active = myProducts.filter(
                (product: any) =>
                    product.dealReached === false || !product.dealReached
            );
            setActiveProducts(active);
            const sold = myProducts.filter(
                (product: any) => product.dealReached === true
            );
            setSoldProducts(sold);
        }
    }, [loading]);

    if (loading) {
        return <CustomLoader />;
    }

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
            <Switcher
                text1="active"
                text2="sold"
                is1Active={catalogStore.activeProductsDashboard}
                set1Active={(status: boolean) =>
                    catalogStore.setActiveProductsDashboard(status)
                }
                is2Active={catalogStore.soldProductsDashboard}
                set2Active={(status: boolean) =>
                    catalogStore.setSoldProductsDashboard(status)
                }
            />
            <CustomTextInput
                placeholder="search my products"
                onChangeText={() => null}
                isSearch
                isComingSoon
            />
            {catalogStore.activeProductsDashboard ? (
                <View
                    style={{
                        flex: 1,
                        marginTop: 22,
                        width: activeProducts.length == 1 ? MAX_WIDTH : null, //this is important due to the fact we need the ProductCard to align to the left of the screen if there is only one product in this section, diush :)
                    }}
                >
                    {activeProducts.length == 0 ? (
                        <EmptyCatalogView isSoldDash={false} />
                    ) : (
                        <FlatList
                            data={activeProducts}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                                marginBottom: 15,
                            }}
                            renderItem={({ item, index }) => (
                                <ProductCard
                                    productData={item}
                                    marginLeft={index % 2 === 0 ? 0 : 5}
                                    marginRight={index % 2 === 0 ? 5 : 0}
                                />
                            )}
                        />
                    )}
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        marginTop: 22,
                        width: soldProducts.length == 1 ? MAX_WIDTH : null, //this is important due to the fact we need the ProductCard to align to the left of the screen if there is only one product in this section, diush :)
                    }}
                >
                    {soldProducts.length == 0 ? (
                        <EmptyCatalogView isSoldDash />
                    ) : (
                        <FlatList
                            data={soldProducts}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                                marginBottom: 15,
                            }}
                            renderItem={({ item, index }) => (
                                <ProductCard
                                    productData={item}
                                    marginLeft={index % 2 === 0 ? 0 : 5}
                                    marginRight={index % 2 === 0 ? 5 : 0}
                                />
                            )}
                        />
                    )}
                </View>
            )}
            <CreateProductButton />
        </View>
    );
};

export default observer(CatalogHome);

// Language: typescript
// import { useUtilStore } from "../../state/Util.store";
// import { LoggedInScreen } from "../../@types/GlobalTypes";
// import { useTheme } from "../../utils/useTheme.util";
// import CustomTextInput from "../../components/lib/CustomTextInput";
// import SearchIcon from "../../icons/catalog/Search";
// import Switcher from "../../components/catalog/Switcher";
// import { truncate } from "../../utils/truncate.util";
// import ProductCard, {
//     IProductCard,
// } from "../../components/catalog/ProductCard";
// import { v4 as uuid } from "uuid";
// import WandIcon from "../../icons/catalog/Wand";
// import CreateProductButton from "../../components/catalog/CreateProductButton";
// import LargeButton from "../../components/lib/LargeButton";
// import {
//     createProductInDb,
//     readMyProductsFromDb,
// } from "../../utils/products.util";
// import { auth, db } from "../../../config/firebase";
// import { query, collection, onSnapshot, where } from "firebase/firestore";

// const CatalogScreen = () => {
//     const utilStore = useUtilStore();
//     const theme = useTheme();
//     const [myProducts, setMyProducts] = React.useState([]);

//     // const MOCK_DATA: IProductCard[] = [
//     //     {
//     //         id: "0de763b0-939a-415c-b879-987e2f120034",
//     //         uri: "https://reactjs.org/logo-og.png",
//     //         title: "Jordan Jersey",
//     //         desc: "Perfect conditions. Only worn once.",
//     //         askingPrice: 90,
//     //         highestOffer: 105,
//     //     },
//     //     {
//     //         id: "hfhj0de763b0-939a-415c-b879-987e2f120034",
//     //         uri: "https://reactjs.org/logo-og.png",
//     //         title: "Jordan Jersey",
//     //         desc: "Perfect conditions. Only worn once.",
//     //         askingPrice: 90,
//     //         highestOffer: 105,
//     //     },
//     //     {
//     //         id: "0de763b0-939a-415c-b879fff",
//     //         uri: "https://reactjs.org/logo-og.png",
//                 }}
//                 {/* {myProducts.length > 0 ? (
//                     <FlatList
//                         data={myProducts}
//                         numColumns={2}
//                         columnWrapperStyle={{
//                             justifyContent: "space-between",
//                             marginBottom: 15,
//                         }}
//                         // keyExtractor={item => {

//                         // }}
//                         renderItem={({ item, index }) => (
//                             <ProductCard
//                                 {...item}
//                                 marginLeft={index % 2 === 0 ? 0 : 5}
//                                 marginRight={index % 2 === 0 ? 5 : 0}
//                             />
//                         )}
//                         showsVerticalScrollIndicator={false}
//                     />
//                 ) : null} */}
//             </View>
//             {/*make a button in the bottom right corner of the screen that has the shape of a circle and a plus sign*/}
//             <CreateProductButton />
//         </View>
//     );
// };

// export default CatalogScreen;
