//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.16.1.0 (NJsonSchema v10.7.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming



export interface WeatherForecast {
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string | undefined;
}

export interface Kkt {
    name: string;
    cartoafi: Cartof[];
}

export interface Cartof {
    sort: string;
}