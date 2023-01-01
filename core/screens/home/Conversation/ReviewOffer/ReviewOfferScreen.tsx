import React from "react";
import CustomText from "../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import ScreenHeader from "../../../../components/lib/ScreenHeader";
import { View } from "react-native";
import { useOfferStore } from "../../../../state/auth/Offer.store";

const ReviewOfferScreen = () => {
    const offerStore = useOfferStore();
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
        </View>
    );
};

export default observer(ReviewOfferScreen);
