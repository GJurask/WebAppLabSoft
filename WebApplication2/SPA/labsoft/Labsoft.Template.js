/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
var Labsoft;
(function (Labsoft) {
    var Template = /** @class */ (function () {
        function Template(url) {
            this.Url = url;
        }
        Template.prototype.Compile = function (data) {
            var template = $.ajax({
                url: this.Url.indexOf("?") > -1 ? this.Url + "&v=1" : this.Url + "?v=1",
                async: false
            }).responseText;
            var compiled = _.template(template);
            return compiled(data);
        };
        Template.Compile = function (template, data) {
            var compiled = _.template(template);
            return compiled(data);
        };
        return Template;
    }());
    Labsoft.Template = Template;
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.Template.js.map