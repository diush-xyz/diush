import React from "react";
import CustomText from "../../lib/CustomText";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import ProductCard from "../../catalog/Dashboard/ProductCard";
import { IProduct, IUser, LoggedInScreen } from "../../../@types/GlobalTypes";
import { truncate } from "../../../utils/truncate.util";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import { useUtilStore } from "../../../state/Util.store";
import {
    getDocs,
    query,
    collection,
    where,
    limit,
    startAfter,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";

interface ISearchFilter {
    searchText: string;
    data: IProduct[];
}

const SearchFilter = (props: ISearchFilter) => {
    const buyProductStore = useBuyProductStore();
    const utilStore = useUtilStore();
    const [sellers, setSellers] = React.useState<any[]>([]);

    const [loading, setLoading] = React.useState<boolean>(true);

    // const fetchSellerUser = async id => {
    //     try {
    //         const querySnapshot = await getDocs(
    //             query(collection(db, "users"), where("id", "==", id))
    //         );
    //         querySnapshot.forEach(doc => {
    //             //@ts-ignore
    //             setSellers([...sellers, doc.data()]);
    //         });
    //     } catch (error) {
    //         console.error("Error fetching seller user:", error);
    //     }

    //     setLoading(false);
    // };

    // React.useEffect(() => {
    //     const fetchSellerUsers = async () => {
    //         try {
    //             const sellerIds = props.data.map(elem => elem.linkedUID);
    //             const batchSize = 10;
    //             let lastDoc: any = null;
    //             let remainingIds = [...sellerIds];

    //             const fetchedSellers: Map<string, IUser> = new Map();

    //             while (remainingIds.length > 0) {
    //                 const currentBatch = remainingIds.slice(0, batchSize);
    //                 remainingIds = remainingIds.slice(batchSize);

    //                 let queryRef = query(
    //                     collection(db, "users"),
    //                     where("id", "in", currentBatch),
    //                     limit(batchSize)
    //                 );

    //                 if (lastDoc) {
    //                     queryRef = query(
    //                         collection(db, "users"),
    //                         where("id", "in", currentBatch),
    //                         limit(batchSize),
    //                         startAfter(lastDoc)
    //                     );
    //                 }

    //                 const querySnapshot = await getDocs(queryRef);

    //                 querySnapshot.forEach(doc => {
    //                     const seller = doc.data();
    //                     //@ts-ignore
    //                     fetchedSellers.set(seller.id, seller);
    //                 });

    //                 if (querySnapshot.docs.length > 0) {
    //                     lastDoc =
    //                         querySnapshot.docs[querySnapshot.docs.length - 1];
    //                 }
    //             }

    //             setSellers(Array.from(fetchedSellers.values()));
    //         } catch (error) {
    //             console.error("Error fetching seller users:", error);
    //         }
    //     };

    //     fetchSellerUsers();
    // }, []);

    return (
        <>
            {props.data.map((elem, idx) => {
                // fetchSellerUser(elem.linkedUID);
                if (props.searchText === "") {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                buyProductStore.setIdFromSearch(elem.id);
                                utilStore.setCurrentLoggedInScreen(
                                    LoggedInScreen.BUY
                                );
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                width: "100%",
                                marginBottom: 20,
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Image
                                    style={{
                                        height: 80,
                                        width: 80,
                                        borderRadius: 10,
                                        resizeMode: "cover",
                                    }}
                                    source={{ uri: elem.imageURL }}
                                />
                                <View
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginLeft: 8,
                                    }}
                                >
                                    <View>
                                        <CustomText font="Bold">
                                            {elem.title}
                                        </CustomText>
                                        <CustomText fontSize={14} secondary>
                                            {truncate(elem.blurb, 25)}
                                        </CustomText>
                                    </View>
                                    <View>
                                        <CustomText accent font="Bold">
                                            {sellers[idx]
                                                ? sellers[idx].displayName
                                                : ""}{" "}
                                            ${elem.askingPrice}
                                        </CustomText>
                                    </View>
                                </View>
                            </View>
                            <ChevronRight />
                        </TouchableOpacity>
                    );
                }
                if (
                    elem.title
                        .toLowerCase()
                        .includes(props.searchText.toLowerCase())
                ) {
                    return (
                        <ProductCard
                            productData={elem}
                            marginLeft={idx % 2 === 0 ? 0 : 5}
                            marginRight={idx % 2 === 0 ? 5 : 0}
                        />
                    );
                }
            })}
        </>
    );
};

export default SearchFilter;
