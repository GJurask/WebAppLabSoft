/// <reference path="../jquery/jquery.d.ts"/>
var Labsoft;
(function (Labsoft) {
    var Json = /** @class */ (function () {
        function Json() {
        }
        Json.Serialize = function (data) {
            return JSON.stringify(data);
        };
        Json.Deserialize = function (jsonString) {
            var obj = JSON.parse(jsonString, Labsoft.Json.Json2Parse);
            //JsonNetDecycle.retrocycle(obj);
            //(<any>resolveReferences)(obj);
            return obj;
        };
        Json.Json2Parse = function (key, value) {
            var a;
            if (typeof value === 'string') {
                a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                if (a) {
                    return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
                }
            }
            return value;
        };
        return Json;
    }());
    Labsoft.Json = Json;
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.Json.js.map