import { makeAutoObservable } from "mobx";
import React from "react";
import { SignupMethod } from "../../@types/GlobalTypes";
import { hapticFeedback } from "../../utils/haptics.util";

/**
 * A store to handle anything signup-related.
 */
export default class SignupStore {
    constructor() {
        makeAutoObservable(this);
    }

    displayName: string = "";

    setDisplayName(newDisplayName: string) {
        this.displayName = newDisplayName;
    }

    email: string = "";

    setEmail(newEmail: string) {
        this.email = newEmail;
    }

    prevEmail: string = "";

    setPrevEmail(newPrevEmail: string) {
        this.prevEmail = newPrevEmail;
    }

    password: string = "";

    setPassword(newPassword: string) {
        this.password = newPassword;
    }

    location: string = "";

    setLocation(newUsername: string) {
        this.location = newUsername;
    }

    method: SignupMethod;

    setMethod(newMethod: SignupMethod) {
        this.method = newMethod;
    }

    currentStep: number = 0;

    setCurrentStep(newCurrentStep: number) {
        hapticFeedback();
        this.currentStep = newCurrentStep;
    }

    otpCode: string = "";

    setOtpCode(newOtpCode: string) {
        this.otpCode = newOtpCode;
    }

    codeMatches: boolean = false;

    setCodeMatches(newCodeMatches: boolean) {
        this.codeMatches = newCodeMatches;
    }

    isVerifyError: boolean = false;

    setIsVerifyError(newIsVerifyError: boolean) {
        this.isVerifyError = newIsVerifyError;
    }

    cancel() {
        this.currentStep = 0;
        this.email = "";
        this.password = "";
        this.location = null;
        this.displayName = "";
        this.method = null;
        this.otpCode = "";
        this.codeMatches = false;
        this.isVerifyError = false;
    }
}

const StoreContext = React.createContext<SignupStore>(new SignupStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useSignupStore = (): SignupStore => React.useContext(StoreContext);
