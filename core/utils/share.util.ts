import { Share } from "react-native";

export const triggerProductSharePopup = async (urlExtension: string) => {
    try {
        const result = await Share.share({
            url: `https://diush-xyz/${urlExtension}`,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};
