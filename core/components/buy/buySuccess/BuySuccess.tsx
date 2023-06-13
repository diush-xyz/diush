import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import { useScopeProductStore } from "../../../state/buy/ScopeProduct.store";
import { usePlaceOfferStore } from "../../../state/buy/PlaceOffer.store";
import { useBuyProductStore } from "../../../state/buy/BuyProduct.store";
import CustomText from "../../lib/CustomText";
import LargeButton from "../../lib/LargeButton/LargeButton.ui";
import { useUtilStore } from "../../../state/Util.store";
import { BuyFlowStatus, LoggedInScreen } from "../../../@types/GlobalTypes";
import { observer } from "mobx-react";
import ConfettiCannon from "react-native-confetti-cannon";
import PopupHeader from "../../lib/PopupHeader";
import { View } from "react-native";

const BuySuccess = () => {
    const scopeProductStore = useScopeProductStore();
    const placeOfferStore = usePlaceOfferStore();
    const buyProductStore = useBuyProductStore();
    const utilStore = useUtilStore();

    const [price, setPrice] = React.useState<string>(
        scopeProductStore.fetchedActiveProduct.askingPrice.toString()
    );

    return (
        <>
            <BottomSheetView style={GLOBAL_STYLES.viewProductSheetViewStyle}>
                <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut />
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
                    <CustomText fontSize={52}>🎉</CustomText>
                    <CustomText
                        fontSize={20}
                        font="Heavy"
                        style={{ marginTop: 32 }}
                    >
                        offer placed!
                    </CustomText>
                    <CustomText
                        accent
                        fontSize={32}
                        font="Heavy"
                        style={{ marginTop: 23 }}
                    >
                        ${placeOfferStore.offerAmount}
                    </CustomText>
                    <CustomText fontSize={18} style={{ marginTop: 8 }}>
                        for{" "}
                        <CustomText font="Heavy" fontSize={18}>
                            {scopeProductStore.fetchedActiveProduct.title}
                        </CustomText>
                    </CustomText>
                    <CustomText
                        textAlign="center"
                        fontSize={18}
                        secondary
                        style={{ marginTop: 32 }}
                    >
                        {`now it’s simply about waiting. you\n will be notified when Lucas has\n decided to accept, decline, or\n negotiate your offer.`}
                    </CustomText>
                    <View style={{ marginTop: 225 }} />
                    <LargeButton
                        title="close"
                        onPress={() => {
                            utilStore.setCurrentLoggedInScreen(
                                LoggedInScreen.HOME
                            );
                            //clear stuff:
                            placeOfferStore.setOfferAmount(0);
                            buyProductStore.setStatus(BuyFlowStatus.SCOPE);
                        }}
                        footer
                        footerButtonTitle="view conversation"
                    />
                </View>
            </BottomSheetView>
        </>
    );
};

export default observer(BuySuccess);
