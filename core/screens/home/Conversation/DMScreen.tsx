import React from "react";
import { ScrollView, View } from "react-native";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { observer } from "mobx-react";
import CustomDMScreenHeader from "../../../components/home/Conversation/DMScreen/CustomDMScreenHeader";
import { useConversationStore } from "../../../state/auth/Conversation.store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import CustomText from "../../../components/lib/CustomText";
import OfferCard from "../../../components/lib/OfferCard";
import ProfileImage from "../../../components/lib/ProfileImage";
import { MAX_WIDTH } from "../../../utils/constants";
import dayjs from "dayjs";

const DMScreen = () => {
    const conversationStore = useConversationStore();
    const [offers, setOffers] = React.useState([]);
    const [linkedProduct, setLinkedProduct] = React.useState(null);

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
    }, []);

    React.useEffect(() => {
        conversationStore.setActiveConversationOffers(offers);
        console.log(conversationStore.activeConversationOffers);
    }, [offers]);

    React.useEffect(() => {
        conversationStore.setActiveConversationProduct(linkedProduct);
    }, [linkedProduct]);

    return (
        <View
            style={{
                flex: 1,
                marginTop: 55,
                justifyContent: "center",
            }}
        >
            <CustomDMScreenHeader />
            <ScrollView>
                {conversationStore.activeConversationOffers?.map(
                    (elem, idx) => {
                        //@ts-ignore
                        const parsed = dayjs.unix(elem.timestamp.seconds);
                        //@ts-ignore
                        const offerTimestamp = dayjs(parsed).fromNow();

                        return (
                            <View
                                style={{
                                    display: "flex",
                                    marginTop: idx == 0 && 16,
                                    paddingLeft: 23, //TODO: Must change when offers are on the right side
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginRight: 8,
                                        }}
                                    >
                                        <ProfileImage
                                            specificUser={
                                                conversationStore.activeConvoOtherUser
                                            }
                                            size={24}
                                        />
                                    </View>
                                    <View>
                                        <OfferCard
                                            specificUser={
                                                conversationStore.activeConvoOtherUser
                                            }
                                            offer={elem}
                                            product={
                                                conversationStore.activeConversationProduct
                                            }
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginLeft: 32, //TODO: Must change when offers are on the right side
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
            </ScrollView>
        </View>
    );
};

export default observer(DMScreen);
