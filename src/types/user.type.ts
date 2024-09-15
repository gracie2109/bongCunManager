import type { IROLE } from ".";

interface BasicInfo {
    phoneNumber?: string,
    photoURL?: string,
    email: string,
    displayName: string,
}

interface ProvideData extends BasicInfo {
    providerId: string,

};

export interface IUser extends BasicInfo {
    userId: string,
    password: string,
    role: IROLE,
    lastName: string,
    firstName: string,
    updatedAt: Date | string,
    createdAt: Date | string,
    providerData: ProvideData[],
    [key: string] : any
}



export type IRegisterPayload = Pick<IUser, 'email' | 'displayName' | 'password'>

export type ILoginPayload = Pick<IUser, 'email' | 'password'>