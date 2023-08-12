import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import AuthStore, { useAuthStore } from "../../../state/auth/Auth.store";
import CustomText from "../../../components/lib/CustomText";
import LargeButton from "../../../components/lib/LargeButton";
import { auth, db } from "../../../../config/firebase";
import { fetchUserFromDb } from "../../../utils/user.utils";
import {
    CatalogStatus,
    IUser,
    LoggedInScreen,
    OfferStatus,
} from "../../../@types/GlobalTypes";
import SignupStore, { useSignupStore } from "../../../state/auth/Signup.store";
import { useLoginStore } from "../../../state/auth/Login.store";
import { useUtilStore } from "../../../state/Util.store";
import { useTheme } from "../../../utils/useTheme.util";
import Sidebar from "../../../components/home/ControlCenter/ControlCenterContent";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import {
    MAX_WIDTH,
    PRODUCT_BOTTOM_SHEET_SNAP_POINTS,
} from "../../../utils/constants";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { useHomeStore } from "../../../state/auth/Home.store";
import ControlCenter from "../../../components/home/ControlCenter";
import ScreenHeader from "../../../components/lib/ScreenHeader";
import Switcher from "../../../components/catalog/Dashboard/Switcher";
import CustomTextInput from "../../../components/lib/CustomTextInput";
import ConversationInstance from "../../../components/home/Conversation/ConversationInstance";
import {
    query,
    collection,
    where,
    onSnapshot,
    getDocs,
    orderBy,
    limit,
} from "firebase/firestore";
import { CONVERSATION } from "../../../components/home/Conversation/ConversationInstance/ConversationInstance";
import { createOfferInDb } from "../../../utils/offers.util";
import { v4 as uuidv4 } from "uuid";
import { useConversationStore } from "../../../state/auth/Conversation.store";
import EmptyHomeView from "../../../components/home/EmptyHomeView";
import GestureRecognizer from "react-native-swipe-detect";
import CustomLoader from "../../../components/lib/CustomLoader/CustomLoader";

const HomeBaseScreen = () => {
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const conversationStore = useConversationStore();
    const homeStore = useHomeStore();
    const [loading, setLoading] = React.useState<boolean>(true);

    const [sortedIncomingConversations, setSortedIncomingConversations] =
        React.useState<any[]>([]);
    const [sortedOutboundConversations, setSortedOutboundConversations] =
        React.useState<any[]>([]);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const fetchIncomingConversations = async () => {
        const q = query(
            collection(db, "conversations"),
            where("sellerUID", "==", auth.currentUser?.uid)
        );

        let incomingConversations = [];

        try {
            const querySnapshot = await getDocs(q);

            for (const conversationDoc of querySnapshot.docs) {
                const conversation = conversationDoc.data();

                const offersRef = collection(db, "offers");
                const offersQuery = query(
                    offersRef,
                    where("linkedConversationID", "==", conversationDoc.id),
                    orderBy("timestamp", "desc"),
                    limit(1)
                );

                const offersQuerySnapshot = await getDocs(offersQuery);

                if (!offersQuerySnapshot.empty) {
                    incomingConversations.push({
                        conversation,
                        offer: offersQuerySnapshot.docs[0].data(),
                    });
                } else {
                    incomingConversations.push({
                        conversation,
                        offer: null,
                    });
                }
            }

            incomingConversations.sort((a, b) => {
                const offerA = a.offer;
                const offerB = b.offer;

                if (offerA && offerB) {
                    return offerB.timestamp - offerA.timestamp;
                } else if (offerA) {
                    return -1;
                } else if (offerB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            setSortedIncomingConversations([...incomingConversations]);
            setLoading(false);
        } catch (error) {
            console.warn("Error fetching incoming conversations:", error);
        }
    };

    const fetchOutboundConversations = async () => {
        const q = query(
            collection(db, "conversations"),
            where("buyerUID", "==", auth.currentUser?.uid)
        );

        let outboundConversations = [];

        try {
            const querySnapshot = await getDocs(q);

            for (const conversationDoc of querySnapshot.docs) {
                const conversation = conversationDoc.data();

                const offersRef = collection(db, "offers");
                const offersQuery = query(
                    offersRef,
                    where("linkedConversationID", "==", conversationDoc.id),
                    orderBy("timestamp", "desc"),
                    limit(1)
                );

                const offersQuerySnapshot = await getDocs(offersQuery);

                if (!offersQuerySnapshot.empty) {
                    outboundConversations.push({
                        conversation,
                        offer: offersQuerySnapshot.docs[0].data(),
                    });
                } else {
                    outboundConversations.push({
                        conversation,
                        offer: null,
                    });
                }
            }

            outboundConversations.sort((a, b) => {
                const offerA = a.offer;
                const offerB = b.offer;

                if (offerA && offerB) {
                    return offerB.timestamp - offerA.timestamp;
                } else if (offerA) {
                    return -1;
                } else if (offerB) {
                    return 1;
                } else {
                    return 0;
                }
            });

            setSortedOutboundConversations([...outboundConversations]);
            setLoading(false);
        } catch (error) {
            console.warn("Error fetching outbound conversations:", error);
        }
    };

    React.useEffect(() => {
        //important for the order of fetching - ensures the data the user needs to see first is fetched before the rest
        if (homeStore.isIncomingChatsActive) {
            fetchIncomingConversations();
            fetchOutboundConversations();
        } else {
            fetchOutboundConversations();
            fetchIncomingConversations();
        }
    }, []);

    if (authStore.userFetchLoading || loading) {
        return (
            <>
                <CustomLoader />
            </>
        );
    }

    return (
        <View
            style={{
                alignItems: "center",
                flex: 1,
                marginTop: 55,
                width: "100%",
            }}
        >
            <ScreenHeader
                pfp
                photoURL={
                    authStore.user.photoURL ??
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                }
                onPfpPress={() => homeStore.setControlCenter(true)}
                title="home base"
            />
            {/* <GestureRecognizer
                onSwipeLeft={() => {
                    if (count === 0) {
                        setCount(count + 1);
                        homeStore.setIsIncomingChatsActive(false);
                        homeStore.setIsOutboundChatsActive(true);
                    }
                }}
                onSwipeRight={() => {
                    if (count === 1) {
                        setCount(count - 1);
                        homeStore.setIsIncomingChatsActive(true);
                        homeStore.setIsOutboundChatsActive(false);
                    }
                }}
                config={config}
                style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                }}
            > */}
            <Switcher
                text1="incoming"
                text2="to others"
                is1Active={homeStore.isIncomingChatsActive}
                set1Active={(status: boolean) => {
                    homeStore.setIsIncomingChatsActive(status);
                }}
                is2Active={homeStore.isOutboundChatsActive}
                set2Active={(status: boolean) => {
                    homeStore.setIsOutboundChatsActive(status);
                }}
            />
            <CustomTextInput
                placeholder="search chats"
                onChangeText={() => null}
                customWidth={350}
                isSearch
                isComingSoon
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    display: "flex",
                    maxWidth: 350,
                    marginTop: 22,
                }}
            >
                {homeStore.isIncomingChatsActive &&
                    sortedIncomingConversations.length > 0 &&
                    sortedIncomingConversations.map((elem, idx) => {
                        return (
                            <ConversationInstance
                                key={idx}
                                type={CONVERSATION.INCOMING}
                                data={elem.conversation}
                                canFetch={
                                    sortedIncomingConversations.length > 0
                                }
                                onPress={() =>
                                    conversationStore.setActiveConversation(
                                        elem.conversation
                                    )
                                }
                            />
                        );
                    })}
                {homeStore.isOutboundChatsActive &&
                    sortedOutboundConversations.length > 0 &&
                    sortedOutboundConversations.map((elem, idx) => {
                        return (
                            <ConversationInstance
                                key={idx}
                                type={CONVERSATION.TO_OTHERS}
                                data={elem.conversation}
                                canFetch={
                                    sortedOutboundConversations.length > 0
                                }
                                onPress={() =>
                                    conversationStore.setActiveConversation(
                                        elem.conversation
                                    )
                                }
                            />
                        );
                    })}
                {homeStore.isIncomingChatsActive &&
                    sortedIncomingConversations.length === 0 && (
                        <EmptyHomeView />
                    )}
                {homeStore.isOutboundChatsActive &&
                    sortedOutboundConversations.length === 0 && (
                        <EmptyHomeView />
                    )}
            </ScrollView>
            {/* </GestureRecognizer> */}
            {/* <View style={{ marginTop: 40, marginBottom: 50, width: "100%" }}>
                <LargeButton
                    title="make a test offer"
                    onPress={() => {
                        utilStore.setCurrentLoggedInScreen(LoggedInScreen.BUY);
                    }}
                />
            </View> */}
        </View>
    );
};

export default observer(HomeBaseScreen);
