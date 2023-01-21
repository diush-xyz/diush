import React, { useRef } from "react";
import { FlexAlignType, ScrollView, View } from "react-native";
import ScreenHeader from "../../../../../components/lib/ScreenHeader";
import { observer } from "mobx-react";
import CustomDMScreenHeader from "../../../../../components/home/Conversation/DMScreen/CustomDMScreenHeader";
import { useConversationStore } from "../../../../../state/auth/Conversation.store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import CustomText from "../../../../../components/lib/CustomText";
import OfferCard from "../../../../../components/lib/OfferCard";
import ProfileImage from "../../../../../components/lib/ProfileImage";
import { MAX_WIDTH } from "../../../../../utils/constants";
import dayjs from "dayjs";
import { useOfferStore } from "../../../../../state/auth/Offer.store";
import { useTheme } from "../../../../../utils/useTheme.util";
import { IUser, OfferStatus } from "../../../../../@types/GlobalTypes";
import { useAuthStore } from "../../../../../state/auth/Auth.store";

const DMScreen = () => {
    const theme = useTheme();
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();
    const { user } = useAuthStore();
    const [offers, setOffers] = React.useState([]);
    const [linkedProduct, setLinkedProduct] = React.useState(null);

    const [isOutbound, setIsOutbound] = React.useState<boolean>(false);

    const scrollViewRef = useRef<any>();

    const fetchOffers = () => {
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
            setOffers([]);

            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.data().timestamp);
                setOffers(prev => [...prev, documentSnapshot.data()]);
            });
        });
    };

    const fetchLinkedProduct = () => {
        const q = query(
            collection(db, "products"),
            where(
                "id",
                "==",
                conversationStore.activeConversation.linkedProductID
            )
        );
        onSnapshot(q, querySnapshot => {
            querySnapshot.forEach(doc => {
                setLinkedProduct(doc.data());
            });
        });
    };

    React.useEffect(() => {
        fetchOffers();
        fetchLinkedProduct();
        setIsOutbound(
            conversationStore.activeConversation.sellerUID !== user.id
        );
    }, []);

    React.useEffect(() => {
        //makes the oldest offers at the start of the array and the newest at the bottom in a message-like format:
        const sortedOffers = offers.sort((a, b) => {
            return a.timestamp - b.timestamp;
        });
        //sets the offers to be displayed in the conversation:
        conversationStore.setActiveConversationOffers(sortedOffers);
    }, [offers]);

    React.useEffect(() => {
        conversationStore.setActiveConversationProduct(linkedProduct);
    }, [linkedProduct]);

    React.useEffect(() => {
        //determine if a deal has been reached
        if (conversationStore.activeConversationOffers) {
            const dealReached = conversationStore.activeConversationOffers.some(
                elem => elem.status == OfferStatus.ACCEPTED
            );
            conversationStore.setActiveConversation({
                ...conversationStore.activeConversation,
                dealReached,
            });
        }
    }, [conversationStore.activeConversationOffers]);

    return (
        <View
            style={{
                flex: 1,
                marginTop: 55,
                justifyContent: "center",
            }}
        >
            <CustomDMScreenHeader />
            {conversationStore.activeConversation.dealReached && (
                <View
                    style={{
                        borderTopWidth: 2,
                        borderBottomWidth: 2,
                        borderTopColor: theme.success,
                        borderBottomColor: theme.success,
                        paddingHorizontal: 17,
                        paddingVertical: 20,
                    }}
                >
                    {/* <CustomText>
                        {conversationStore.activeConversation.sellerUID ==
                        user.id
                            ? "a deal has been reached! we will let you know when the buyer issues a payment and their preferred shipping method. you can always accept new offers during this time, which will cancel this one."
                            : "a deal has been reached! follow the next steps to complete the transaction."}
                    </CustomText> */}
                    <CustomText>
                        a deal has been reached! hang tight; this is as far as
                        the sale functionality goes for the testflight. Payments
                        and transactions to finalize deals are coming very soon!
                        stay tuned.
                    </CustomText>
                </View>
            )}
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() =>
                    scrollViewRef!.current?.scrollToEnd({ animated: true })
                }
            >
                {conversationStore.activeConversationOffers?.map(
                    (elem, idx) => {
                        let offerCardPositioning: FlexAlignType = "flex-start";
                        let paddingLeft: number;
                        let paddingRight: number;
                        let specificUser: IUser;

                        //@ts-ignore
                        const parsed = dayjs.unix(elem.timestamp.seconds);
                        //@ts-ignore
                        const offerTimestamp = dayjs(parsed).fromNow();

                        if (elem.isCounterOffer && isOutbound) {
                            offerCardPositioning = "flex-start";
                            paddingLeft = 10;
                            paddingRight = 0;
                            specificUser =
                                conversationStore.activeConvoOtherUser;
                        } else if (elem.isCounterOffer && !isOutbound) {
                            offerCardPositioning = "flex-end";
                            paddingLeft = 0;
                            paddingRight = 10;
                            specificUser = user;
                        } else if (!elem.isCounterOffer && isOutbound) {
                            offerCardPositioning = "flex-end";
                            paddingLeft = 0;
                            paddingRight = 10;
                            specificUser = user;
                        } else {
                            offerCardPositioning = "flex-start";
                            paddingLeft = 10;
                            specificUser =
                                conversationStore.activeConvoOtherUser;
                        }

                        return (
                            <View
                                key={idx}
                                //@ts-ignore
                                style={{
                                    display: "flex",
                                    marginTop: 16,
                                    alignItems: offerCardPositioning,
                                    paddingLeft: paddingLeft,
                                    paddingRight: paddingRight,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    {!elem.isCounterOffer && !isOutbound && (
                                        <View
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginRight: 8,
                                            }}
                                        >
                                            <ProfileImage
                                                specificUser={specificUser}
                                                size={24}
                                            />
                                        </View>
                                    )}
                                    {elem.isCounterOffer && isOutbound && (
                                        <View
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginRight: 8,
                                            }}
                                        >
                                            <ProfileImage
                                                specificUser={specificUser}
                                                size={24}
                                            />
                                        </View>
                                    )}
                                    <View>
                                        <OfferCard
                                            specificUser={specificUser}
                                            offer={elem}
                                            product={
                                                conversationStore.activeConversationProduct
                                            }
                                            onReviewPress={() =>
                                                offerStore.setOfferBeingReviewed(
                                                    elem
                                                )
                                            }
                                        />
                                    </View>
                                    {elem.isCounterOffer && !isOutbound && (
                                        <View
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginLeft: 8,
                                            }}
                                        >
                                            <ProfileImage
                                                specificUser={specificUser}
                                                size={24}
                                            />
                                        </View>
                                    )}
                                    {!elem.isCounterOffer && isOutbound && (
                                        <View
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                marginLeft: 8,
                                            }}
                                        >
                                            <ProfileImage
                                                specificUser={specificUser}
                                                size={24}
                                            />
                                        </View>
                                    )}
                                </View>
                                <View
                                    style={{
                                        marginLeft: 32,
                                        marginTop: 10,
                                    }}
                                >
                                    <CustomText secondary>
                                        {offerTimestamp}
                                    </CustomText>
                                </View>
                            </View>
                        );
                    }
                )}
                <View style={{ marginTop: 100 }} />
            </ScrollView>
        </View>
    );
};

export default observer(DMScreen);
