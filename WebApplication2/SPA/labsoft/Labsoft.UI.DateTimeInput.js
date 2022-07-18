/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>
var Labsoft;
(function (Labsoft) {
    var UI;
    (function (UI) {
        var DateTimeInput = /** @class */ (function () {
            function DateTimeInput() {
                this.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.DateTimeInput.html');
            }
            DateTimeInput.prototype.Render = function () {
                var self = this;
                this.DOMid = _.uniqueId("DateTimeInput_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").find("input").eq(0);
                this.DOMElement.kendoDateTimePicker({
                //dateInput: true
                });
                this.KendoDateTimePicker = this.DOMElement.data("kendoDateTimePicker");
                return this.DOM;
            };
            DateTimeInput.prototype.GetData = function () {
                return this.KendoDateTimePicker.value();
            };
            DateTimeInput.prototype.SetData = function (data) {
                this.KendoDateTimePicker.value(data);
            };
            DateTimeInput.prototype.SetEnable = function (enable) {
                this.KendoDateTimePicker.enable(enable);
            };
            return DateTimeInput;
        }());
        UI.DateTimeInput = DateTimeInput;
    })(UI = Labsoft.UI || (Labsoft.UI = {}));
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.UI.DateTimeInput.js.map