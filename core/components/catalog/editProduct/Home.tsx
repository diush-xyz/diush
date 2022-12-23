import { TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { observer } from "mobx-react";
import { CatalogStatus } from "../../../@types/GlobalTypes";
import { useUtilStore } from "../../../state/Util.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import ScreenHeader from "../../lib/ScreenHeader";
import Switcher from "../Dashboard/Switcher";
import HorizontalLine from "../../lib/HorizontalLine";
import { MAX_WIDTH } from "../../../utils/constants";
import CustomText from "../../lib/CustomText";
import { useTheme } from "../../../utils/useTheme.util";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import ImageSection from "./ImageSection";

const EditProductHome = () => {
    const catalogStore = useCatalogStore();
    const utilStore = useUtilStore();
    const theme = useTheme();

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
                backArrowOnPress={() =>
                    catalogStore.setStatus(CatalogStatus.VIEW)
                }
                title="edit listing"
                subtitle="my catalog"
                button
                buttonText="save"
                onButtonPress={() => null}
                buttonDisabled={false}
            />
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: MAX_WIDTH,
                }}
            >
                <HorizontalLine marginVertical={16} />
                <ImageSection />
            </View>
        </View>
    );
};

export default observer(EditProductHome);
