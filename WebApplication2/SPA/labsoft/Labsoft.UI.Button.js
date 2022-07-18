/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>
var Labsoft;
(function (Labsoft) {
    var UI;
    (function (UI) {
        var Button = /** @class */ (function () {
            function Button() {
                this.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.Button.html');
            }
            Button.prototype.Render = function () {
                var _this = this;
                var self = this;
                this.DOMid = _.uniqueId("Button_");
                this.DOM = $(this.Template.Compile(this));
                this.DOM.on("click", function () {
                    if (_this.OnClick)
                        _this.OnClick();
                });
                return this.DOM;
            };
            Button.prototype.SetEnable = function (enable) {
                this.DOM.enable(enable);
            };
            Button.prototype.SetVisible = function (visible) {
                if (visible)
                    this.DOM.show();
                else
                    this.DOM.hide();
            };
            return Button;
        }());
        UI.Button = Button;
    })(UI = Labsoft.UI || (Labsoft.UI = {}));
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.UI.Button.js.map