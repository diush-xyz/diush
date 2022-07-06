import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, SignupMethods } from "../../@types/GlobalTypes";

/**
 * A store to handle anything auth-related.
 */
export default class SignupStore {
    constructor() {
        makeAutoObservable(this);
    }

    method: SignupMethods;

    setMethod(newMethod: SignupMethods) {
        this.method = newMethod;
    }

    currentStep: number = 0;

    setCurrentStep(newCurrentStep: number) {
        this.currentStep = newCurrentStep;
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
