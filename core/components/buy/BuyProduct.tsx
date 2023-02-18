import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { observer } from "mobx-react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import ImageOverlay from "./ImageOverlay";
import SnapshotBox from "./SnapshotBox";
import ProductViewScrollWrapper from "./ProductViewScrollWrapper";
import WrittenInfoSection from "./WrittenInfoSection";
import Header from "./Header";
import ImageModal from "./ImageModal";
import CustomDeleteConfirmation from "./CustomDeleteConfirmation";
import dayjs from "dayjs";
import { GLOBAL_STYLES } from "../../@types/GlobalStyles";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { useSellerViewProductStore } from "../../state/auth/SellerViewProductStore";
import { useBuyProductStore } from "../../state/auth/BuyProduct.store";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import CustomText from "../lib/CustomText";

const BuyProductContent = () => {
    const buyProductStore = useBuyProductStore();
    const sellerViewProductStore = useSellerViewProductStore();
    const [loading, setLoading] = React.useState<boolean>(true);

    // const [timeAgo, setTimeAgo] = React.useState<string>("");

    // React.useEffect(() => {
    //     const parsed = dayjs.unix(
    //         //@ts-ignore
    //         buyProductStore.activeProduct?.createdAt.seconds
    //     );
    //     //@ts-ignore
    //     setTimeAgo(dayjs(parsed).fromNow(true));
    // });

    React.useEffect(() => {
        buyProductStore.setActiveProductId(
            "517b0a58-70fb-47e8-bd90-56b882813a3e"
        );
        const q = query(
            collection(db, "products"),
            where("id", "==", buyProductStore.activeProductId)
        );
        onSnapshot(q, querySnapshot => {
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            buyProductStore.setActiveProduct(fetched[0]);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <CustomText accent>loading...</CustomText>;
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
                        if (sellerViewProductStore.productOptionsPopup) {
                            sellerViewProductStore.setProductOptionsPopup();
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
                            uri: buyProductStore.activeProduct?.imageURL,
                        }}
                    />
                    <ImageOverlay style={{ position: "absolute", top: 0 }} />
                    <View style={{ marginTop: -185, paddingHorizontal: 22 }}>
                        {sellerViewProductStore.imageModal && <ImageModal />}
                        {sellerViewProductStore.deleteConfirmation && (
                            <CustomDeleteConfirmation />
                        )}
                        {/* <Header />
                        <SnapshotBox
                            askingPrice={
                                buyProductStore.activeProduct.askingPrice
                            }
                            highestOffer={
                                sellerViewProductStore.highestOfferAmount ??
                                null
                            } //TODO: Backend integration
                            // posted={timeAgo}
                            posted={null} //TODO: Fix
                        /> */}
                        <WrittenInfoSection />
                        <View style={{ marginBottom: 60 }} />
                    </View>
                </TouchableOpacity>
            </ProductViewScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(BuyProductContent);
