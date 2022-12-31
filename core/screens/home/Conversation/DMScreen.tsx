import React from "react";
import { View } from "react-native";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import { observer } from "mobx-react";
import CustomDMScreenHeader from "../../../components/home/Conversation/DMScreen/CustomDMScreenHeader";
import { useConversationStore } from "../../../state/auth/Conversation.store";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import CustomText from "../../../components/lib/CustomText";
import OfferCard from "../../../components/lib/OfferCard";

const DMScreen = () => {
    const conversationStore = useConversationStore();
    const [offers, setOffers] = React.useState([]);

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

    React.useEffect(() => {
        fetchOffers();
    }, []);

    React.useEffect(() => {
        conversationStore.setActiveConversationOffers(offers);
        console.log(conversationStore.activeConversationOffers);
    }, [offers]);

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <CustomDMScreenHeader />
            {conversationStore.activeConversationOffers?.map((elem, idx) => {
                return <CustomText>{elem.amount}</CustomText>;
            })}
            <OfferCard title="The best" />
        </View>
    );
};

export default observer(DMScreen);
