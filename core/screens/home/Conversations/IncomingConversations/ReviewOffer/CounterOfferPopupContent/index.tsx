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
import HorizontalLine from "../../../../../../components/lib/HorizontalLine";
import InfoIcon from "../../../../../../icons/common/info";
import PriceInput from "../../../../../../components/lib/PriceInput";
import LargeButton from "../../../../../../components/lib/LargeButton";

const CounterOfferPopupContent = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const { user } = useAuthStore();
    const [price, setPrice] = React.useState<string>(
        offerStore.offerBeingReviewed?.amount?.toString()
    );

    const counterOffer = async () => {
        const offerRef = doc(db, "offers", offerStore.offerBeingReviewed.id);

        await updateDoc(offerRef, {
            status: OfferStatus.DECLINED,
        });

        //create the new offer (counter offer)
        createOfferInDb({
            id: uuidv4(),
            amount: Number(price),
            isReadByRecipient: false,
            linkedConversationID: conversationStore.activeConversation.id,
            placedByUID: user.id,
            timestamp: new Date(),
            isCounterOffer: !(
                conversationStore.activeConversation.sellerUID !== user.id
            ),
            status: OfferStatus.PENDING,
        });

        offerStore.setIsOfferBeingCountered(false);
        offerStore.setOfferBeingReviewed(null);
    };

    React.useEffect(() => {
        console.log("price", price);
    }, [price]);

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
                    <View style={{ display: "flex", marginTop: 20 }}>
                        <CustomText secondary>
                            asking price:{" "}
                            <CustomText secondary font="Heavy">
                                $90
                            </CustomText>
                        </CustomText>
                        <CustomText secondary style={{ marginTop: 8 }}>
                            highest overall offer:
                            <CustomText secondary font="Heavy">
                                $90
                            </CustomText>
                        </CustomText>
                    </View>
                    <HorizontalLine marginVertical={20} />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <InfoIcon />
                        <CustomText secondary style={{ marginLeft: 5 }}>
                            learn more about counters
                        </CustomText>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 35,
                        }}
                    >
                        <PriceInput price={price} setPrice={setPrice} />
                    </View>
                    <View style={{ marginTop: 35 }}>
                        <LargeButton
                            title="place counter offer"
                            onPress={counterOffer}
                            disabled={
                                offerStore.offerBeingReviewed?.amount ==
                                Number(price)
                            }
                        />
                    </View>
                </View>
            </View>
        </BottomSheetView>
    );
};

export default observer(CounterOfferPopupContent);
