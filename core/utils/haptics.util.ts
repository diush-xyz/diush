import * as Haptics from "expo-haptics";

export enum HAPTIC_OPTIONS {
    LIGHT,
    MEDIUM,
    HEAVY,
    SUCCESS,
    WARNING,
    ERROR,
}

export const hapticFeedback = (type?: HAPTIC_OPTIONS) => {
    switch (type) {
        case HAPTIC_OPTIONS.LIGHT:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
        case HAPTIC_OPTIONS.MEDIUM:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
        case HAPTIC_OPTIONS.HEAVY:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            break;
        case HAPTIC_OPTIONS.SUCCESS:
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
        case HAPTIC_OPTIONS.WARNING:
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        case HAPTIC_OPTIONS.ERROR:
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
        default:
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
    }
};
