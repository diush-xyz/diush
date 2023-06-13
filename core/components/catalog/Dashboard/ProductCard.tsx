import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { truncate } from "../../../utils/truncate.util";
import CustomText from "../../lib/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { CatalogStatus, IOffer, IProduct } from "../../../@types/GlobalTypes";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../../../../config/firebase";
import { getHighestOffer } from "../../../utils/getHighestOffer.util";
import { useSellerViewProductStore } from "../../../state/auth/SellerViewProductStore";

export interface IProductCard {
    productData: IProduct;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
}

const ProductCard = (props: IProductCard) => {
    const catalogStore = useCatalogStore();
    const sellerViewProductStore = useSellerViewProductStore();
    const [offers, setOffers] = React.useState([]);

    const [allProductOffers, setAllProductOffers] = React.useState([]);
    const [offerLoading, setOfferLoading] = React.useState<boolean>(true);
    const [highestOffer, setHighestOffer] = React.useState<IOffer>(null);

    //get the highest offer for the product (all conversations)
    React.useEffect(() => {
        const q = query(
            collection(db, "offers"),
            where("linkedProductID", "==", props.productData.id)
        );
        onSnapshot(q, querySnapshot => {
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setAllProductOffers(fetched);
            setOfferLoading(false);
        });
    }, []);

    React.useEffect(() => {
        if (allProductOffers.length > 0 && !offerLoading) {
            const highest = getHighestOffer(allProductOffers);
            setHighestOffer(highest);
        }
    }, [offerLoading]);

    if (offerLoading) {
        return <CustomText accent>loading...</CustomText>;
    }

    return (
        <TouchableOpacity
            onPress={() => {
                catalogStore.setStatus(CatalogStatus.VIEW);
                catalogStore.setActiveProduct(props.productData);

                sellerViewProductStore.setHighestOfferAmount(
                    highestOffer?.amount ?? null
                );
            }}
        >
            {/*@ts-ignore*/}
            <ImageBackground
                // source={{ uri: props.productData.uri }}
                //TODO: ADD URI to backend
                source={{ uri: props.productData?.imageURL }}
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
                    marginLeft: props.marginLeft || 0,
                    marginRight: props.marginRight || 0,
                    marginTop: props.marginTop || 0,
                    marginBottom: props.marginBottom || 0,
                }}
            >
                {/* make a LinearGradient that overlays the entire background with the following properties: linear-gradient(180deg, #000000 -29.74%, rgba(26, 26, 26, 0.5) 50.32%, #000000 134.48%);*/}
                <LinearGradient
                    colors={["#000000", "rgba(26, 26, 26, 0.5)", "#000000"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 8,
                    }}
                />
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
                            ${props.productData?.askingPrice}
                        </CustomText>
                    </View>
                    <View>
                        {allProductOffers.length > 0 && !offerLoading && (
                            <>
                                <CustomText primary fontSize={10} font="Heavy">
                                    highest offer
                                </CustomText>
                                <CustomText
                                    accent
                                    font="Black"
                                    fontSize={18}
                                    textAlign="right"
                                >
                                    ${highestOffer?.amount}
                                </CustomText>
                            </>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        width: "100%",
                        marginBottom: 19,
                    }}
                >
                    <CustomText primary fontSize={18} font="Black">
                        {truncate(props.productData?.title, 18)}
                    </CustomText>
                    <CustomText primary font="Bold">
                        {truncate(props.productData?.blurb, 22)}
                    </CustomText>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ProductCard;
