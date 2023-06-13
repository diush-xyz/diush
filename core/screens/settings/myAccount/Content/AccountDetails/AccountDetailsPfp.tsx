import React from "react";
import CustomText from "../../../../../components/lib/CustomText";
import { observer } from "mobx-react";
import {
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";
import ScreenHeader from "../../../../../components/lib/ScreenHeader";
import { useSettingsStore } from "../../../../../state/auth/Settings.store";
import {
    AccountDetailsSettingsStatus,
    MyAccountSettingsStatus,
} from "../../../../../@types/GlobalTypes";
import { MAX_WIDTH } from "../../../../../utils/constants";
import HorizontalLine from "../../../../../components/lib/HorizontalLine";
import { ISettingsData } from "../../../home/SettingsHome.screen";
import MenuElem from "../../../../../components/settings/MenuElem";
import { useAuthStore } from "../../../../../state/auth/Auth.store";
import CustomTextInput from "../../../../../components/lib/CustomTextInput";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../../config/firebase";
import SettingsScrollWrapper from "../../../../../components/settings/SettingsScrollWrapper";
import { containsWhitespace } from "../../../../../utils/containsWhitespace";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "../../../../../components/lib/ProfileImage";

const AccountDetailsPfp = () => {
    const settingsStore = useSettingsStore();
    const { user } = useAuthStore();
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSave = async (str: string) => {
        const userRef = doc(db, "users", user.id);

        await updateDoc(userRef, {
            photoURL: str,
        }).then(() => {
            setLoading(false);
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const storage = getStorage();
            const storageRef = ref(storage, `userProfileImages/${user.id}/pfp`);

            //delete the file in the db before uploading a new one
            if (
                user.photoURL !== "" ||
                user.photoURL !== undefined ||
                user.photoURL !== null
            ) {
                // Delete the file
                deleteObject(storageRef)
                    .then(() => {
                        console.log("File deleted!");
                    })
                    .catch(error => {
                        console.log("Somehing went wrong.");
                    });
            }

            const img = await fetch(result.assets[0].uri);
            const bytes = await img.blob();

            await uploadBytes(storageRef, bytes).then(() => {
                setLoading(true);
                getDownloadURL(storageRef)
                    .then(url => {
                        handleSave(url);
                    })
                    .catch(err => {
                        // console.warn(err);
                    });
            }); //upload images
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

    if (loading) {
        return <CustomText accent>loading...</CustomText>;
    }

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
                    settingsStore.setAccountDetailsSettingsStatus(
                        AccountDetailsSettingsStatus.HOME
                    )
                }
                title="profile image"
                subtitle="account details"
            />
            <SettingsScrollWrapper>
                <View
                    style={{
                        display: "flex",
                        width: MAX_WIDTH,
                        marginTop: 22,
                    }}
                >
                    <HorizontalLine marginVertical={8} />
                    <View style={{ marginTop: 10 }}>
                        <CustomText font="Bold" style={{ marginBottom: 8 }}>
                            {user.photoURL
                                ? "tap to replace"
                                : "tap to add a profile image"}
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => pickImage()}
                            style={{ marginTop: 5 }}
                        >
                            <ProfileImage
                                specificUser={user}
                                size={100}
                                border
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/*this must be out here for the error bar's width to cover 100% of the screen*/}
            </SettingsScrollWrapper>
        </View>
    );
};

export default observer(AccountDetailsPfp);
