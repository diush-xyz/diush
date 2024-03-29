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
import { useTheme } from "../../../utils/useTheme.util";
import ResultElem from "./ResultElem/ResultElem";

interface ISearchFilter {
    searchText: string;
    data: IProduct[];
}

const SearchFilter = (props: ISearchFilter) => {
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

    //TODO: Clean this up later, it's inefficient (but works) xD
    return (
        <>
            {props.data.map((elem: IProduct, idx: number) => {
                // fetchSellerUser(elem.linkedUID);
                if (props.searchText === "") {
                    return <ResultElem elem={elem} idx={idx} />;
                }
                if (
                    elem.title
                        .toLowerCase()
                        .includes(props.searchText.toLowerCase())
                ) {
                    return <ResultElem elem={elem} idx={idx} />;
                }
            })}
        </>
    );
};

export default SearchFilter;
