/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>

module Labsoft {
    export class Template {
        private Url: string;

        constructor(url: string) {
            this.Url = url;
        }

        public Compile(data: Object) {
            var template = $.ajax({
                url: this.Url.indexOf("?") > -1 ? this.Url + "&v=1" : this.Url + "?v=1",
                async: false
            }).responseText;

            var compiled = _.template(template);
            return compiled(data);
        }

        public static Compile(template: string, data: Object): string {
            var compiled = _.template(template);
            return compiled(data);
        }
    }
}