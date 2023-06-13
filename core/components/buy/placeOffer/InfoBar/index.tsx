import { query, collection, where, onSnapshot } from "firebase/firestore";
import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { db } from "../../../../../config/firebase";
import { IOffer } from "../../../../@types/GlobalTypes";
import { useConversationStore } from "../../../../state/auth/Conversation.store";
import { useOfferStore } from "../../../../state/auth/Offer.store";
import { getHighestOffer } from "../../../../utils/getHighestOffer.util";
import CustomText from "../../../lib/CustomText";
import HorizontalLine from "../../../lib/HorizontalLine";
import { useScopeProductStore } from "../../../../state/buy/ScopeProduct.store";

const InfoBar = () => {
    const offerStore = useOfferStore();
    const [allProductOffers, setAllProductOffers] = React.useState([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [highestOffer, setHighestOffer] = React.useState<IOffer>(null);
    const scopeProductStore = useScopeProductStore();

    //get the highest offer for the product (all conversations)
    React.useEffect(() => {
        const q = query(
            collection(db, "offers"),
            where(
                "linkedProductID",
                "==",
                scopeProductStore.fetchedActiveProduct.id
            )
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
            setLoading(false);
        });
    }, []);

    React.useEffect(() => {
        if (allProductOffers.length > 0 && !loading) {
            const highest = getHighestOffer(allProductOffers);
            setHighestOffer(highest);
        }
    }, [loading]);

    const INFO_SECTION_DATA = [
        {
            text: "original asking price",
            value: `$${scopeProductStore.fetchedActiveProduct.askingPrice}`,
        },
        {
            text: "highest product offer (all conversations)",
            value: `$${highestOffer?.amount}`,
        },
    ];

    if (loading) {
        return <CustomText accent>loading...</CustomText>;
    }

    return (
        <View style={{ display: "flex", marginTop: 30 }}>
            {INFO_SECTION_DATA.map((elem, idx) => {
                return (
                    <>
                        <View
                            key={idx}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <CustomText secondary>{elem.text}</CustomText>
                            <CustomText secondary>{elem.value}</CustomText>
                        </View>
                        {idx !== INFO_SECTION_DATA.length - 1 && (
                            <HorizontalLine marginVertical={18} />
                        )}
                    </>
                );
            })}
        </View>
    );
};

export default observer(InfoBar);
