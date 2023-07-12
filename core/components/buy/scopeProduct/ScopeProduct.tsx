import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { observer } from "mobx-react";
import { TouchableOpacity, View } from "react-native";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { Image } from "react-native";
import ImageOverlay from "./ImageOverlay";
import SnapshotBox from "./SnapshotBox";
import ProductViewScrollWrapper from "./ProductViewScrollWrapper";
import WrittenInfoSection from "./WrittenInfoSection";
import Header from "./Header";
import ImageModal from "./ImageModal";
import { useSellerViewProductStore } from "../../../state/auth/SellerViewProductStore";
import dayjs from "dayjs";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import {
    query,
    collection,
    where,
    onSnapshot,
    getDocs,
} from "firebase/firestore";
import { db, auth } from "../../../../config/firebase";
import CustomText from "../../lib/CustomText";
import CustomLoader from "../../lib/CustomLoader";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import { useUtilStore } from "../../../state/Util.store";
import { LoggedInScreen } from "../../../@types/GlobalTypes";

const ScopeProduct = () => {
    const utilStore = useUtilStore();
    const catalogStore = useCatalogStore();
    const scopeProductStore = useScopeProductStore();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sellerUserLoading, setSellerUserLoading] =
        React.useState<boolean>(true);
    const buyProductStore = useBuyProductStore();

    React.useEffect(() => {
        // if (buyProductStore.idFromLink !== "") {
        const id = buyProductStore.idFromSearch;
        const q = query(
            collection(db, "products"),
            where("id", "==", id)
            // where("id", "==", "34fa7fe8-d798-430e-81f6-67c0e7dc574a")
        );
        onSnapshot(q, querySnapshot => {
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            scopeProductStore.setFetchedActiveProduct(fetched[0]);
            setLoading(false);
        });
        // }
    }, [buyProductStore.idFromSearch]);

    const fetchSellerUser = async () => {
        try {
            const querySnapshot = await getDocs(
                query(
                    collection(db, "users"),
                    where(
                        "id",
                        "==",
                        scopeProductStore.fetchedActiveProduct.linkedUID
                    )
                )
            );
            querySnapshot.forEach(doc => {
                //@ts-ignore
                buyProductStore.setSeller(doc.data());
            });
        } catch (error) {
            console.error("Error fetching seller user:", error);
        }

        setSellerUserLoading(false);
    };

    React.useEffect(() => {
        if (!loading) {
            fetchSellerUser();
        }
    }, [loading]);

    const [timeAgo, setTimeAgo] = React.useState<string>("");

    React.useEffect(() => {
        // @ts-ignore
        if (!loading) {
            setTimeAgo("hi");
            // const parsed = dayjs.unix(
            //     //@ts-ignore
            //     scopeProductStore.fetchedActiveProduct.createdAt?.seconds
            // );
            // //@ts-ignore
            // const offerTimestamp = dayjs(parsed).fromNow(true);
            // setTimeAgo(offerTimestamp);
        }
    }, [loading]);

    if (loading || sellerUserLoading) {
        return (
            <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                    }}
                >
                    <CustomLoader />
                </View>
            </BottomSheetView>
        );
    }

    return (
        <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
            <ProductViewScrollWrapper>
                <TouchableOpacity
                    style={{
                        flex: 1,
                    }}
                    activeOpacity={1}
                    onPress={() => {
                        if (scopeProductStore.productOptionsPopup) {
                            scopeProductStore.setProductOptionsPopup();
                        } else {
                            null;
                        }
                    }}
                >
                    <Image
                        style={{
                            height: 471,
                            width: "100%",
                            resizeMode: "cover",
                        }}
                        source={{
                            uri: scopeProductStore.fetchedActiveProduct
                                .imageURL,
                        }}
                    />
                    <ImageOverlay style={{ position: "absolute", top: 0 }} />
                    <View style={{ marginTop: -185, paddingHorizontal: 22 }}>
                        {scopeProductStore.imageModal && <ImageModal />}
                        {/* {sellerViewProductStore.deleteConfirmation && (
                            <CustomDeleteConfirmation />
                        )} */}
                        <Header />
                        <SnapshotBox
                            askingPrice={
                                scopeProductStore.fetchedActiveProduct
                                    .askingPrice
                            }
                            highestOffer={89} //TODO: Backend integration
                            posted={timeAgo} //TODO: Backend integration
                        />
                        <WrittenInfoSection />
                        <View style={{ marginBottom: 60 }} />
                    </View>
                </TouchableOpacity>
            </ProductViewScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ScopeProduct);
