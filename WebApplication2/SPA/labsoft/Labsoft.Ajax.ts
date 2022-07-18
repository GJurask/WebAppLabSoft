/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../jquery/jquery.cookie.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../pace/pace.d.ts"/>
/// <reference path="../labsoft/Labsoft.Json.ts"/>

module Labsoft {
    export class Ajax {

        public static Get(url: string, data: any, onSucess: (data: any) => void, onError?: (message: any) => any, cache?: boolean) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    cache: cache != null ? cache : null,
                    converters: { "text json": Labsoft.Json.Deserialize },
                    success: (data: any, status: any, xhr: any) => {
                        onSucess(data);
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }

        public static GetSync(url: string, data: any, onSucess: (data: any) => void, onError?: (message: any) => any) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    async: false,
                    converters: { "text json": Labsoft.Json.Deserialize },
                    success: (data: any, status: any, xhr: any) => {
                        onSucess(data);
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }

        public static Post(url: string, data: any, onSucess: (data: any) => void, onError?: (message: any) => any) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: (data: any, status: any, xhr: any) => {
                        onSucess(data);
                    },
                    beforeSend: function (xhr) {
                        xhr.onreadystatechange = function () {
                            console.log(xhr.responseText);
                        };
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }

        public static Delete(url: string, onSucess: (data: any) => void, onError?: (message: any) => any) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: (data: any, status: any, xhr: any) => {
                        onSucess(data);
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }

        public static PutSync(url: string, data: any, onSucess: (data: any) => void, onError?: (message: any) => any) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "PUT",
                    url: url,
                    async: false,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: (data: any) => {
                        onSucess(data);
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }

        public static Put(url: string, data: any, onSucess: (data: any) => void, onError?: (message: any) => any) {
            (<any>Pace).track(function () {
                $.ajax({
                    type: "PUT",
                    url: url,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: (data: any, status: any, xhr: any) => {
                        onSucess(data);
                    },
                    error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        }
    }
}