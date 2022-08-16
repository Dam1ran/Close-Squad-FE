//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface ServerAnnouncementDto {
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
    token: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}