import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PopupHeader from "../../lib/PopupHeader";
import { View } from "react-native";
import LargeButton from "../../lib/LargeButton";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import { usePlaceOfferStore } from "../../../state/buy/PlaceOffer.store";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import { BuyFlowStatus, OfferStatus } from "../../../@types/GlobalTypes";
import InfoBar from "./InfoBar";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import ProfileImage from "../../lib/ProfileImage";
import styled from "styled-components/native";
import { observer } from "mobx-react";
import OfferInput from "./OfferInput";
import { createOfferInDb } from "../../../utils/offers.util";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { createConversationInDb } from "../../../utils/conversations.util";

const PlaceOffer = () => {
    const scopeProductStore = useScopeProductStore();
    const placeOfferStore = usePlaceOfferStore();
    const buyProductStore = useBuyProductStore();
    const { user } = useAuthStore();

    const [price, setPrice] = React.useState<string>(
        scopeProductStore.fetchedActiveProduct.askingPrice.toString()
    );

    const Wrapper = styled.View`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    `;

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
                <PopupHeader
                    title="place offer"
                    backArrow
                    backArrowOnPress={() =>
                        buyProductStore.setStatus(BuyFlowStatus.SCOPE)
                    }
                />
                <View
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Wrapper>
                        <View
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: MAX_WIDTH,
                                marginBottom: 40,
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    marginTop: 16,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View>
                                        <CustomText font="Heavy" fontSize={22}>
                                            {
                                                scopeProductStore
                                                    .fetchedActiveProduct.title
                                            }
                                        </CustomText>
                                    </View>
                                    {/* <View>
                                            <RoundedMoreIcon />
                                        </View> */}
                                </View>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginTop: 10,
                                        alignItems: "center",
                                    }}
                                >
                                    <ProfileImage
                                        specificUser={buyProductStore.seller}
                                        size={20}
                                    />
                                    <CustomText
                                        fontSize={16}
                                        style={{ marginLeft: 6 }}
                                        font="Bold"
                                    >
                                        <CustomText
                                            font="Bold"
                                            style={{ opacity: 0.5 }}
                                        >
                                            listed by
                                        </CustomText>{" "}
                                        {buyProductStore.seller.displayName}
                                    </CustomText>
                                    {/*TODO: Come back to this*/}
                                    <ChevronRight style={{ marginLeft: 7 }} />
                                </View>
                                <InfoBar />
                            </View>
                        </View>
                        <OfferInput />
                        <LargeButton
                            title="offer"
                            onPress={() => {
                                const convoId = uuidv4();
                                //create the conversation in the db
                                createConversationInDb({
                                    id: convoId,
                                    buyerUID: user.id,
                                    sellerUID:
                                        scopeProductStore.fetchedActiveProduct
                                            .linkedUID,
                                    dealReached: false,
                                    linkedProductID:
                                        scopeProductStore.fetchedActiveProduct
                                            .id,
                                });
                                //make the first offer in the conversation we just created
                                createOfferInDb({
                                    id: uuidv4(),
                                    amount: placeOfferStore.offerAmount,
                                    isReadByRecipient: false,
                                    linkedConversationID: convoId,
                                    placedByUID: user.id,
                                    timestamp: new Date(),
                                    status: OfferStatus.PENDING,
                                    isCounterOffer: false,
                                    linkedProductID:
                                        scopeProductStore.fetchedActiveProduct
                                            .id,
                                });
                                //take the user to the success screen
                                buyProductStore.setStatus(
                                    BuyFlowStatus.SUCCESS
                                );
                            }}
                            footer
                            footerButtonTitle="cancel"
                            footerButtonOnPress={() => {
                                buyProductStore.setStatus(BuyFlowStatus.SCOPE);
                            }}
                        />
                    </Wrapper>
                </View>
            </BottomSheetView>
        </>
    );
};

export default observer(PlaceOffer);
