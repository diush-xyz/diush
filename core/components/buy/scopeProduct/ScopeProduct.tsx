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
import { useScopeProductStore } from "../../../state/auth/ScopeProduct.store";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../../config/firebase";
import CustomText from "../../lib/CustomText";

const ScopeProduct = () => {
    const catalogStore = useCatalogStore();
    const scopeProductStore = useScopeProductStore();
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const q = query(
            collection(db, "products"),
            where("id", "==", "604191c1-da81-48a8-8bb7-d8ea9deb1edb") //TODO: Add dynamic link fetched one here later
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
    }, []);

    const [timeAgo, setTimeAgo] = React.useState<string>("");

    React.useEffect(() => {
        //@ts-ignore
        // const parsed = dayjs.unix(catalogStore.activeProduct.createdAt.seconds);
        //@ts-ignore
        // setTimeAgo(dayjs(parsed).fromNow(true)); //TODO: Fix this
        setTimeAgo("hiii");
    });

    if (loading) {
        return (
            <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
                <CustomText>Loading...</CustomText>
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
                        {/* <SnapshotBox
                            askingPrice={catalogStore.activeProduct.askingPrice}
                            highestOffer={
                                sellerViewProductStore.highestOfferAmount ??
                                null
                            } //TODO: Backend integration
                            posted={timeAgo} //TODO: Backend integration
                        /> */}
                        <WrittenInfoSection />
                        <View style={{ marginBottom: 60 }} />
                    </View>
                </TouchableOpacity>
            </ProductViewScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ScopeProduct);
