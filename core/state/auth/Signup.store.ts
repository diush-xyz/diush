import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, IUser, SignupMethods } from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class SignupStore {
    constructor() {
        makeAutoObservable(this);
    }

    email: string = "";

    setEmail(newEmail: string) {
        this.email = newEmail;
    }

    password: string = "";

    setPassword(newPassword: string) {
        this.password = newPassword;
    }

    username: string = "";

    setUsername(newUsername: string) {
        this.username = newUsername;
    }

    method: SignupMethods;

    setMethod(newMethod: SignupMethods) {
        this.method = newMethod;
    }

    currentStep: number = 0;

    setCurrentStep(newCurrentStep: number) {
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

    cancel() {
        this.currentStep = 0;
        this.email = "";
        this.password = "";
        this.username = "";
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
