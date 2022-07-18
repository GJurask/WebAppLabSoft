/// <reference path="../jquery/jquery.d.ts"/>

module Labsoft {
    export class Json {

        public static Serialize(data: any) {
            return JSON.stringify(data);
        }

        public static Deserialize(jsonString: string) {
            var obj = JSON.parse(jsonString, Labsoft.Json.Json2Parse);
            //JsonNetDecycle.retrocycle(obj);
            //(<any>resolveReferences)(obj);
            return obj;
        }

        private static Json2Parse(key, value) {
            var a;
            if (typeof value === 'string') {
                a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                if (a) {
                    return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                        +a[5], +a[6]));
                }
            }
            return value;
        }
    }
}