import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { CatalogStatus, SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { TouchableOpacity, View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";

const ProductImage = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();

    return (
        <BottomSheetView style={GLOBAL_STYLES.bottomSheetViewStyle}>
            <PopupHeader
                title="create listing"
                backArrow
                backArrowOnPress={() =>
                    createProductStore.setCurrentStep(
                        createProductStore.currentStep - 1
                    )
                }
                subtitle="my catalog"
                progressIndicator
                currentStep={4}
                totalSteps={7}
            />
            <ScrollWrapper>
                <FlowTemplate
                    circleEmoji="📸"
                    title="say cheese..."
                    desc={
                        "showcase your item with\n images. make sure they’re clear."
                    }
                    marginBottom={utilStore.isKeyboardOpen ? "200px" : null}
                >
                    <LargeButton
                        title="continue"
                        onPress={() => {
                            if (createProductStore.condition !== null) {
                                createProductStore.setCurrentStep(
                                    createProductStore.currentStep + 1
                                );
                            }
                        }}
                        footer
                        // disabled={!allClear && !firstTime}
                        disabled={createProductStore.condition == null}
                        footerButtonTitle="cancel"
                        footerButtonOnPress={() =>
                            catalogStore.setStatus(CatalogStatus.ACTIVE_DASH)
                        }
                    />
                </FlowTemplate>
            </ScrollWrapper>
        </BottomSheetView>
    );
};

export default observer(ProductImage);
