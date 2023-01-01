import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { View } from "react-native";
import { useOfferStore } from "../../../../state/auth/Offer.store";
import { useConversationStore } from "../../../../state/auth/Conversation.store";
import RoundedMoreIcon from "../../../../icons/common/RoundedMore";
import { MAX_WIDTH } from "../../../../utils/constants";

const ReviewOfferScreen = () => {
    const offerStore = useOfferStore();
    const conversationStore = useConversationStore();

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
                backArrow
                backArrowOnPress={() => offerStore.setOfferBeingReviewed(null)}
                title="offer review"
                button
                buttonText="counter"
                // onButtonPress={() => save()}
                // buttonDisabled={!hasChanged}
                paddingBottom={16}
            />
            <View style={{ display: "flex", width: MAX_WIDTH }}>
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
                            {conversationStore.activeConversationProduct.title}{" "}
                            <CustomText secondary font="Heavy" fontSize={22}>
                                •
                            </CustomText>{" "}
                            <CustomText accent font="Heavy" fontSize={22}>
                                $
                                {
                                    conversationStore.activeConversationProduct
                                        .askingPrice
                                }
                            </CustomText>
                        </CustomText>
                    </View>
                    <View>
                        <RoundedMoreIcon />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default observer(ReviewOfferScreen);
