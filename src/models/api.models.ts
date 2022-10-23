//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface CharacterCreationDto {
    nickname: string;
    characterClass: CsEntityClass;
    gender: number;
}

export enum CsEntityClass {
    Assassin = 1,
    Berserk = 2,
    Cupid = 3,
    Doctor = 4,
    Handyman = 5,
    Medium = 6,
    Occultist = 7,
    Seer = 8,
    Templar = 9,
}

export interface GameSettings {
    nrOfCols: number;
    nrOfRows: number;
}

export interface ServerAnnouncementDto {
    id: number;
    createdAt: Date;
    message: string;
}

export interface CreateServerAnnouncementViewModel {
    message: string;
}

export interface UserRegisterDto {
    nickname: string;
    email: string;
    repeatEmail: string;
    password: string;
    repeatPassword: string;
}

export interface ConfirmEmailDto {
    guid: string;
}

export interface ResendConfirmationDto {
    email: string;
    repeatEmail: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface ChangePasswordEmailDto {
    email: string;
    repeatEmail: string;
}

export interface ChangePasswordDto {
    guid: string;
    password: string;
    repeatPassword: string;
}

export interface SessionIdDto {
    sessionId: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}