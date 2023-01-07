import React from "react";
import { useOfferStore } from "../../../../../state/auth/Offer.store";
import { useConversationStore } from "../../../../../state/auth/Conversation.store";
import { View } from "react-native";
import CustomText from "../../../../lib/CustomText";
import { observer } from "mobx-react";
import HorizontalLine from "../../../../lib/HorizontalLine";

const InfoSection = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();

    //get the highest offer from the conversation
    const highestOffer = conversationStore.activeConversationOffers?.reduce(
        (prev, current) => {
            return prev.amount > current.amount ? prev : current;
        }
    );

    const INFO_SECTION_DATA = [
        {
            text: "original asking price",
            value: `$${conversationStore.activeConversationProduct?.askingPrice}`,
        },
        {
            text: "highest overall offer",
            value: `$${highestOffer?.amount}`,
        }, //TODO: get the highest offer from the entire product's offers, not just this conversation
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
