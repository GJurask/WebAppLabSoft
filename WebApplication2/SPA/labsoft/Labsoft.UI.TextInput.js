/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>
var Labsoft;
(function (Labsoft) {
    var UI;
    (function (UI) {
        var TextInput = /** @class */ (function () {
            function TextInput() {
                this.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.TextInput.html');
            }
            TextInput.prototype.Render = function () {
                var self = this;
                this.DOMid = _.uniqueId("DateTimeInput_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").find("input").eq(0);
                return this.DOM;
            };
            TextInput.prototype.GetData = function () {
                return this.DOMElement.val();
            };
            TextInput.prototype.SetData = function (data) {
                this.DOMElement.val(data);
            };
            TextInput.prototype.SetEnable = function (enable) {
                this.DOMElement.enable(enable);
            };
            return TextInput;
        }());
        UI.TextInput = TextInput;
    })(UI = Labsoft.UI || (Labsoft.UI = {}));
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.UI.TextInput.js.map