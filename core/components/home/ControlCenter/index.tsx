import React from "react";
import { useHomeStore } from "../../../state/auth/Home.store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import ControlCenterContent from "./ControlCenterContent";

const ControlCenter = () => {
    const homeStore = useHomeStore();
    const sheetRef = React.useRef<BottomSheet>(null);

    return (
        <>
            {homeStore.isSidebarOpen && (
                <BottomSheet
                    handleIndicatorStyle={GLOBAL_STYLES.handleIndicatorStyle}
                    handleStyle={GLOBAL_STYLES.handleStyle}
                    ref={sheetRef}
                    snapPoints={["44%"]}
                    enablePanDownToClose={true}
                    onClose={() => homeStore.setIsSidebarOpen(false)}
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.0,

                        elevation: 24,
                    }}
                >
                    <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
                        <ControlCenterContent />
                    </BottomSheetView>
                </BottomSheet>
            )}
        </>
    );
};

export default ControlCenter;
