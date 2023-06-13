import { View, Image, ScrollView } from "react-native";
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
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { CONVERSATION } from "../../../components/home/Conversation/ConversationInstance/ConversationInstance";
import { createOfferInDb } from "../../../utils/offers.util";
import { v4 as uuidv4 } from "uuid";
import { useConversationStore } from "../../../state/auth/Conversation.store";
import EmptyHomeView from "../../../components/home/EmptyHomeView";
import GestureRecognizer from "react-native-swipe-detect";

const HomeBaseScreen = () => {
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const conversationStore = useConversationStore();
    const homeStore = useHomeStore();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [incomingConversations, setIncomingConversations] = React.useState(
        []
    );
    const [outboundConversations, setOutboundConversations] = React.useState(
        []
    );
    const [count, setCount] = React.useState<number>(0);
    const [swipeStarted, setSwipeStarted] = React.useState<boolean>(false);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const fetchIncomingConversations = () => {
        const q = query(
            collection(db, "conversations"),
            where("sellerUID", "==", auth.currentUser?.uid)
        );

        onSnapshot(q, querySnapshot => {
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setIncomingConversations(fetched);
            setLoading(false);
        });
    };

    const fetchOutboundConversations = () => {
        const q = query(
            collection(db, "conversations"),
            where("buyerUID", "==", auth.currentUser?.uid)
        );

        onSnapshot(q, querySnapshot => {
            const fetched = [];

            querySnapshot.forEach(documentSnapshot => {
                fetched.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });

            setOutboundConversations(fetched);
            setLoading(false);
        });
    };

    React.useEffect(() => {
        fetchIncomingConversations();
        fetchOutboundConversations();
    }, []);

    if (authStore.userFetchLoading || loading) {
        return (
            <>
                <CustomText accent>Loading...</CustomText>
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
                // backArrow
                // backArrowOnPress={() =>
                //     utilStore.setCurrentLoggedInScreen(LoggedInScreen.HOME)
                // }
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
                set1Active={(status: boolean) =>
                    homeStore.setIsIncomingChatsActive(status)
                }
                is2Active={homeStore.isOutboundChatsActive}
                set2Active={(status: boolean) =>
                    homeStore.setIsOutboundChatsActive(status)
                }
            />
            <CustomTextInput
                placeholder="search chats"
                onChangeText={() => null}
                customWidth={350}
                isSearch
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
                    incomingConversations.length > 0 &&
                    incomingConversations.map((elem, idx) => {
                        return (
                            <ConversationInstance
                                key={idx}
                                type={CONVERSATION.INCOMING}
                                data={elem}
                                canFetch={incomingConversations.length > 0}
                                onPress={() =>
                                    conversationStore.setActiveConversation(
                                        elem
                                    )
                                }
                            />
                        );
                    })}
                {homeStore.isOutboundChatsActive &&
                    outboundConversations.length > 0 &&
                    outboundConversations.map((elem, idx) => {
                        return (
                            <ConversationInstance
                                key={idx}
                                type={CONVERSATION.TO_OTHERS}
                                data={elem}
                                canFetch={outboundConversations.length > 0}
                                onPress={() =>
                                    conversationStore.setActiveConversation(
                                        elem
                                    )
                                }
                            />
                        );
                    })}
                {homeStore.isIncomingChatsActive &&
                    incomingConversations.length === 0 && <EmptyHomeView />}
                {homeStore.isOutboundChatsActive &&
                    outboundConversations.length === 0 && <EmptyHomeView />}
            </ScrollView>
            {/* </GestureRecognizer> */}
            {/* <View style={{ marginTop: 40, width: "100%" }}>
                <LargeButton
                    title="create offer"
                    onPress={() => {
                        createOfferInDb({
                            id: uuidv4(),
                            amount: 26,
                            isReadByRecipient: false,
                            linkedConversationID: "gOe51DwdMtg6lbcYoVoi",
                            placedByUID: "1ekZfMGJtVedOgxW3XjD4vHIdt12",
                            timestamp: new Date(),
                            status: OfferStatus.PENDING,
                            isCounterOffer: false,
                            linkedProductID:
                                "728671c7-35fe-47a3-8996-bc12e0f5076f",
                        });
                    }}
                />
            </View> */}
            <View style={{ marginTop: 40, marginBottom: 50, width: "100%" }}>
                <LargeButton
                    title="make a test offer"
                    onPress={() => {
                        utilStore.setCurrentLoggedInScreen(LoggedInScreen.BUY);
                    }}
                />
            </View>
        </View>
    );
};

export default observer(HomeBaseScreen);
