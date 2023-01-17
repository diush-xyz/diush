import React from "react";
import { useOfferStore } from "../../../../../state/auth/Offer.store";
import CounterOfferPopupContent from "./CounterOfferPopupContent";
import ReviewOfferHome from "./Home";
import { observer } from "mobx-react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../../../@types/GlobalStyles";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../../../../utils/constants";

const ReviewOfferScreen = () => {
    const offerStore = useOfferStore();
    const sheetRef = React.useRef<BottomSheet>(null);

    return (
        <>
            <ReviewOfferHome />
            {offerStore.isOfferBeingCountered && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={BOTTOM_SHEET_SNAP_POINTS}
                    enablePanDownToClose={true}
                    onClose={() => offerStore.setIsOfferBeingCountered(false)}
                >
                    <CounterOfferPopupContent />
                </BottomSheet>
            )}
        </>
    );
};

export default observer(ReviewOfferScreen);
