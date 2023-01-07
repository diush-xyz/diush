import React from "react";
import CustomText from "../../../../../../components/lib/CustomText";
import { View } from "react-native";
import { observer } from "mobx-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../../config/firebase";
import { useOfferStore } from "../../../../../../state/auth/Offer.store";
import { OfferStatus } from "../../../../../../@types/GlobalTypes";
import { createOfferInDb } from "../../../../../../utils/offers.util";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../../../../../../state/auth/Auth.store";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../../../@types/GlobalStyles";
import CustomCounterOfferPopupHeader from "../../../../../../components/home/Conversation/CounterOffer/CustomCounterOfferPopupHeader/CustomCounterOfferPopupHeader";

const CounterOfferPopupContent = () => {
    const offerStore = useOfferStore();
    const { user } = useAuthStore();

    const counterOffer = async () => {
        const offerRef = doc(db, "offers", offerStore.offerBeingReviewed.id);

        await updateDoc(offerRef, {
            status: OfferStatus.DECLINED,
        });

        //create the new offer (counter offer)
        createOfferInDb({
            id: uuidv4(),
            amount: 2000,
            isReadByRecipient: false,
            linkedConversationID: "7FEoNJoAGnsXNKT1iVzX",
            placedByUID: user.id,
            timestamp: new Date(),
            isCounterOffer: true,
            status: OfferStatus.PENDING,
        });
    };

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <View
                style={{
                    flex: 1,
                    marginTop: 15,
                }}
            >
                <CustomCounterOfferPopupHeader />
                <CustomText>The best</CustomText>
            </View>
        </BottomSheetView>
    );
};

export default observer(CounterOfferPopupContent);
