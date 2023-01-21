import React from "react";
import { useOfferStore } from "../../../../../state/auth/Offer.store";
import { useConversationStore } from "../../../../../state/auth/Conversation.store";
import { View } from "react-native";
import CustomText from "../../../../lib/CustomText";
import { observer } from "mobx-react";
import HorizontalLine from "../../../../lib/HorizontalLine";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { getHighestOffer } from "../../../../../utils/getHighestOffer.util";
import { IOffer } from "../../../../../@types/GlobalTypes";

const InfoSection = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const [allProductOffers, setAllProductOffers] = React.useState([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [highestOffer, setHighestOffer] = React.useState<IOffer>(null);

    //get the highest offer from the conversation

    React.useEffect(() => {
        const q = query(
            collection(db, "offers"),
            where(
                "linkedConversationID",
                "==",
                conversationStore.activeConversation.id
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
        if (!loading) {
            const highest = getHighestOffer(allProductOffers);
            setHighestOffer(highest);
        }
    }, [loading]);

    const INFO_SECTION_DATA = [
        {
            text: "original asking price",
            value: `$${conversationStore.activeConversationProduct?.askingPrice}`,
        },
        {
            text: "highest overall offer",
            value: `$${highestOffer?.amount}`,
        },
        {
            text: "items",
            value: "1 unit",
        },
        {
            text: "offer",
            value: `$${offerStore.offerBeingReviewed.amount}`,
        },
    ];

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
                            <CustomText>{elem.text}</CustomText>
                            <CustomText>{elem.value}</CustomText>
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

export default observer(InfoSection);
