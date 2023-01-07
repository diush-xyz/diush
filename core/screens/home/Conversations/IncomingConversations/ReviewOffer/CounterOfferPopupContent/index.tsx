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
import ProfileImage from "../../../../../../components/lib/ProfileImage";
import ChevronRight from "../../../../../../icons/catalog/ChevronRight";
import RoundedMoreIcon from "../../../../../../icons/common/RoundedMore";
import { useConversationStore } from "../../../../../../state/auth/Conversation.store";
import { MAX_WIDTH } from "../../../../../../utils/constants";

const CounterOfferPopupContent = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
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
                    alignItems: "center",
                    marginTop: 15,
                }}
            >
                <CustomCounterOfferPopupHeader />
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 16,
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <View>
                            <CustomText font="Heavy" fontSize={22}>
                                {
                                    conversationStore.activeConversationProduct
                                        ?.title
                                }
                            </CustomText>
                        </View>
                        <View>
                            <RoundedMoreIcon />
                        </View>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}
                    >
                        <ProfileImage specificUser={user} size={20} />
                        <CustomText
                            fontSize={16}
                            style={{ marginLeft: 6 }}
                            font="Bold"
                        >
                            <CustomText font="Bold" style={{ opacity: 0.5 }}>
                                listed by
                            </CustomText>{" "}
                            me
                        </CustomText>
                        {/*TODO: Come back to this*/}
                        <ChevronRight style={{ marginLeft: 7 }} />
                    </View>
                </View>
            </View>
        </BottomSheetView>
    );
};

export default observer(CounterOfferPopupContent);
