/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../jquery/jquery.cookie.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../pace/pace.d.ts"/>
/// <reference path="../labsoft/Labsoft.Json.ts"/>
var Labsoft;
(function (Labsoft) {
    var Ajax = /** @class */ (function () {
        function Ajax() {
        }
        Ajax.Get = function (url, data, onSucess, onError, cache) {
            Pace.track(function () {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    cache: cache != null ? cache : null,
                    converters: { "text json": Labsoft.Json.Deserialize },
                    success: function (data, status, xhr) {
                        onSucess(data);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        Ajax.GetSync = function (url, data, onSucess, onError) {
            Pace.track(function () {
                $.ajax({
                    type: "GET",
                    url: url,
                    data: data,
                    async: false,
                    converters: { "text json": Labsoft.Json.Deserialize },
                    success: function (data, status, xhr) {
                        onSucess(data);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        Ajax.Post = function (url, data, onSucess, onError) {
            Pace.track(function () {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: function (data, status, xhr) {
                        onSucess(data);
                    },
                    beforeSend: function (xhr) {
                        xhr.onreadystatechange = function () {
                            console.log(xhr.responseText);
                        };
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        Ajax.Delete = function (url, onSucess, onError) {
            Pace.track(function () {
                $.ajax({
                    type: "DELETE",
                    url: url,
                    success: function (data, status, xhr) {
                        onSucess(data);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        Ajax.PutSync = function (url, data, onSucess, onError) {
            Pace.track(function () {
                $.ajax({
                    type: "PUT",
                    url: url,
                    async: false,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        onSucess(data);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        Ajax.Put = function (url, data, onSucess, onError) {
            Pace.track(function () {
                $.ajax({
                    type: "PUT",
                    url: url,
                    data: JSON.stringify(data),
                    converters: { "text json": Labsoft.Json.Deserialize },
                    contentType: "application/json; charset=utf-8",
                    success: function (data, status, xhr) {
                        onSucess(data);
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        if (!_.isUndefined(onError)) {
                            onError(jqXHR);
                        }
                    }
                });
            });
        };
        return Ajax;
    }());
    Labsoft.Ajax = Ajax;
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.Ajax.js.map