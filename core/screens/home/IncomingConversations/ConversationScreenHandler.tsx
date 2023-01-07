import React from "react";
import { useOfferStore } from "../../../state/auth/Offer.store";
import ReviewOfferScreen from "./ReviewOffer/ReviewOfferScreen";
import DMScreen from "./DM/DMScreen";
import { observer } from "mobx-react";

const ConversationScreenHandler = () => {
    const offerStore = useOfferStore();
    return (
        <>
            {offerStore.offerBeingReviewed ? (
                <ReviewOfferScreen />
            ) : (
                <DMScreen />
            )}
        </>
    );
};

export default observer(ConversationScreenHandler);
