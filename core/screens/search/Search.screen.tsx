import React from "react";
import { ScrollView, View } from "react-native";
import { LoggedInScreen } from "../../@types/GlobalTypes";
import ScreenHeader from "../../components/lib/ScreenHeader";
import { useUtilStore } from "../../state/Util.store";
import { observer } from "mobx-react";
import { useTheme } from "../../utils/useTheme.util";
import CustomText from "../../components/lib/CustomText";
import CustomTextInput from "../../components/lib/CustomTextInput";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import CustomLoader from "../../components/lib/CustomLoader";
import SearchFilter from "../../components/search/SearchFilter/SearchFilter";
import { MAX_WIDTH } from "../../utils/constants";

const SearchScreen = () => {
    const utilStore = useUtilStore();
    const theme = useTheme();

    const [allProducts, setAllProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [value, setValue] = React.useState<string>("");

    const fetchProducts = async () => {
        try {
            const q = query(
                collection(db, "products"),
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

            setAllProducts(fetched);
            setLoading(false);
        } catch (error) {
            console.error("An error occurred fetching products:", error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

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
                <CustomText fontSize={12} style={{ textAlign: "justify" }}>
                    <CustomText fontSize={12} font="Heavy">
                        NOTE:
                    </CustomText>{" "}
                    hey there! this feature is sort of a temporary way of being
                    able to test out the bulk of diush's functionality without
                    having to delay it any further due to having to implement
                    deeplinks. They will come soon! For now, to make an offer
                    for a product, search for it here. ❤️
                </CustomText>
            </View>
            <CustomTextInput
                placeholder="angry birds plushie"
                isSearch
                onChangeText={text => setValue(text)}
                marginTop={20}
            />
            <ScrollView
                showsVerticalScrollIndicator
                style={{
                    overflow: "scroll",
                    width: MAX_WIDTH,
                    height: 300,
                    marginTop: 20,
                }}
            >
                <SearchFilter searchText={value} data={allProducts} />
            </ScrollView>
        </View>
    );
};

export default observer(SearchScreen);
