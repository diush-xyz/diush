import { View, Image } from "react-native";
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

const HomeBaseScreen = () => {
    const authStore = useAuthStore();
    const conversationStore = useConversationStore();
    const homeStore = useHomeStore();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [incomingConversations, setIncomingConversations] = React.useState(
        []
    );

    React.useEffect(() => {
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
    }, []);

    if (authStore.userFetchLoading || loading) {
        return (
            <>
                <CustomText accent>Loading...</CustomText>
            </>
        );
    }

    return (
        <>
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
                    isSearch
                />
                <View
                    style={{
                        display: "flex",
                        maxWidth: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    {incomingConversations.length > 0
                        ? incomingConversations.map((elem, idx) => {
                              return (
                                  <ConversationInstance
                                      key={idx}
                                      type={CONVERSATION.INCOMING}
                                      data={elem}
                                      canFetch={
                                          incomingConversations.length > 0
                                      }
                                      onPress={() =>
                                          conversationStore.setActiveConversation(
                                              elem
                                          )
                                      }
                                  />
                              );
                          })
                        : null}
                </View>
                <View style={{ marginTop: 40, width: "100%" }}>
                    <LargeButton
                        title="create offer"
                        onPress={() => {
                            createOfferInDb({
                                id: uuidv4(),
                                amount: 1000,
                                isReadByRecipient: false,
                                linkedConversationID: "qkLN7ikP9MS3eO7JhmyY",
                                placedByUID: "7kJNkJEE99budW0BO4cEBjyYLOs1",
                                timestamp: new Date(),
                                status: OfferStatus.PENDING,
                            });
                        }}
                    />
                </View>
            </View>
            <ControlCenter />
        </>
    );
};

export default observer(HomeBaseScreen);
