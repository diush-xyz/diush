import React from "react";
import CustomText from "../../../../../../components/lib/CustomText";
import { View } from "react-native";
import { observer } from "mobx-react";
import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../../../../../../../config/firebase";
import { useOfferStore } from "../../../../../../state/auth/Offer.store";
import { IOffer, OfferStatus } from "../../../../../../@types/GlobalTypes";
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
import { useUtilStore } from "../../../../../../state/Util.store";
import { hapticFeedback } from "../../../../../../utils/haptics.util";
import { getHighestOffer } from "../../../../../../utils/getHighestOffer.util";

const CounterOfferPopupContent = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const utilStore = useUtilStore();
    const { user } = useAuthStore();
    const [price, setPrice] = React.useState<string>(
        offerStore.offerBeingReviewed?.amount?.toString()
    );
    const [allProductOffers, setAllProductOffers] = React.useState([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [highestOffer, setHighestOffer] = React.useState<IOffer>(null);

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
            linkedProductID: conversationStore.activeConversationProduct.id,
        });

        //actions:
        offerStore.setIsOfferBeingCountered(false);
        offerStore.setOfferBeingReviewed(null);
        hapticFeedback();
        utilStore.setMsgIndicator("Counter sent!");
        setTimeout(() => {
            utilStore.setMsgIndicator();
        }, 2500);
    };

    React.useEffect(() => {
        const q = query(
            collection(db, "offers"),
            where(
                "linkedProductID",
                "==",
                conversationStore.activeConversationProduct.id
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

    if (loading) {
        return <CustomText accent>loading...</CustomText>;
    }

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
                                $
                                {
                                    conversationStore.activeConversationProduct
                                        .askingPrice
                                }
                            </CustomText>
                        </CustomText>
                        <CustomText secondary style={{ marginTop: 8 }}>
                            highest overall offer (all conversations):{" "}
                            <CustomText secondary font="Heavy">
                                ${highestOffer?.amount}
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
