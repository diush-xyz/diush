import { makeAutoObservable } from "mobx";
import React from "react";
import { AuthStatus, IUser, SignupMethods } from "../../@types/GlobalTypes";

/**
 * A store to handle anything signup-related.
 */
export default class LoginStore {
    constructor() {
        makeAutoObservable(this);
    }

    currentStep: number = 0;

    setCurrentStep(newCurrentStep: number) {
        this.currentStep = newCurrentStep;
    }

    email: string = "";

    setEmail(newEmail: string) {
        this.email = newEmail;
    }

    password: string = "";

    setPassword(newPassword: string) {
        this.password = newPassword;
    }

    cancel() {
        this.currentStep = 0;
        this.email = "";
        this.password = "";
    }
}

const StoreContext = React.createContext<LoginStore>(new LoginStore());

/**
 * Hook to use store.
 *
 * @see Reference:
 *      https://dev.to/codingislove/how-to-setup-mobx-with-react-context-49jh
 */
export const useLoginStore = (): LoginStore => React.useContext(StoreContext);
