import React from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { GLOBAL_STYLES } from "../../../@types/GlobalStyles";
import FlowTemplate from "../../lib/FlowTemplate";
import PopupHeader from "../../lib/PopupHeader";
import { observer } from "mobx-react";
import { useSignupStore } from "../../../state/auth/Signup.store";
import { CatalogStatus, SignupMethod } from "../../../@types/GlobalTypes";
import SignupOptionButton from "../../auth/SignupOptionbutton/SignupOptionButton";
import { Platform, TouchableOpacity, View } from "react-native";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import CustomTextInput from "../../lib/CustomTextInput";
import LargeButton from "../../lib/LargeButton";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScrollWrapper from "../../auth/ScrollWrapper/ScrollWrapper";
import * as ImagePicker from "expo-image-picker";

const ProductImage = () => {
    const catalogStore = useCatalogStore();
    const createProductStore = useCreateProductStore();
    const utilStore = useUtilStore();
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            //@ts-ignore
            setImage(result.uri);
        }
    };

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

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
                    <LargeButton title="Upload" onPress={() => pickImage()} />
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
