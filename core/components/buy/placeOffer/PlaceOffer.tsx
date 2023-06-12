import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import PopupHeader from "../../lib/PopupHeader";
import { View } from "react-native";
import FlowTemplate from "../../lib/FlowTemplate";
import LargeButton from "../../lib/LargeButton";
import PriceInput from "../../lib/PriceInput";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import { usePlaceOfferStore } from "../../../state/buy/PlaceOffer.store";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import { BuyFlowStatus } from "../../../@types/GlobalTypes";
import InfoBar from "./InfoBar";
import ChevronRight from "../../../icons/catalog/ChevronRight";
import RoundedMoreIcon from "../../../icons/common/RoundedMore";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import ProfileImage from "../../lib/ProfileImage";
import { useAuthStore } from "../../../state/auth/Auth.store";
import ProductViewScrollWrapper from "../scopeProduct/ProductViewScrollWrapper";
import { FlowTemplateWrapper } from "../../lib/FlowTemplate/styles";
import styled from "styled-components/native";
import { observer } from "mobx-react";

const PlaceOffer = () => {
    const scopeProductStore = useScopeProductStore();
    const placeOfferStore = usePlaceOfferStore();
    const buyProductStore = useBuyProductStore();

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
                    <ProductViewScrollWrapper>
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
                                            <CustomText
                                                font="Heavy"
                                                fontSize={22}
                                            >
                                                {
                                                    scopeProductStore
                                                        .fetchedActiveProduct
                                                        .title
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
                                            specificUser={
                                                buyProductStore.seller
                                            }
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
                                        <ChevronRight
                                            style={{ marginLeft: 7 }}
                                        />
                                    </View>
                                    <InfoBar />
                                </View>
                            </View>
                            <PriceInput price={price} setPrice={setPrice} />
                            <LargeButton
                                title="place offer"
                                onPress={() => {
                                    const parsedPrice = Number(price);
                                    if (parsedPrice > 0) {
                                        placeOfferStore.setOfferAmount(
                                            parsedPrice
                                        );
                                        buyProductStore.setStatus(
                                            BuyFlowStatus.SUCCESS
                                        );
                                    }
                                }}
                                footer
                                disabled={
                                    Number(price) ==
                                    scopeProductStore.fetchedActiveProduct
                                        .askingPrice
                                }
                                // disabled={!allClear && !firstTime}
                                footerButtonTitle="cancel"
                                footerButtonOnPress={() => {
                                    buyProductStore.setStatus(
                                        BuyFlowStatus.SCOPE
                                    );
                                }}
                            />
                        </Wrapper>
                    </ProductViewScrollWrapper>
                </View>
            </BottomSheetView>
        </>
    );
};

export default observer(PlaceOffer);
