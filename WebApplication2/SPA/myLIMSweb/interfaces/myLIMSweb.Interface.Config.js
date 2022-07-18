/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>
var myLIMSweb;
(function (myLIMSweb) {
    var Interface;
    (function (Interface) {
        var Config = /** @class */ (function () {
            function Config() {
                this.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.Config.html');
            }
            Config.prototype.Render = function () {
                var self = this;
                this.DOMid = _.uniqueId("Config_");
                this.DOM = $(this.Template.Compile(this));
                this.CreateExpectedValueInput();
                this.CreateResultValueInput();
                this.CreateExecuteButton();
                return this.DOM;
            };
            Config.prototype.Execute = function () {
                var _this = this;
                Labsoft.Ajax.Get("api/configs", null, function (data) {
                    _this.ExpectedValueInput.SetData("Resultado esperado 0.000100");
                    _this.ResultValueInput.SetData(data);
                });
            };
            Config.prototype.CreateExpectedValueInput = function () {
                this.ExpectedValueInput = new Labsoft.UI.TextInput();
                this.ExpectedValueInput.Title = "Valor Esperado";
                this.ExpectedValueInput.Size = 3;
                this.DOM.find("#ExpectedValueInput").html(this.ExpectedValueInput.Render());
                this.ExpectedValueInput.SetEnable(false);
            };
            Config.prototype.CreateResultValueInput = function () {
                this.ResultValueInput = new Labsoft.UI.TextInput();
                this.ResultValueInput.Title = "Valor Obtido";
                this.ResultValueInput.Size = 3;
                this.DOM.find("#ResultValueInput").html(this.ResultValueInput.Render());
                this.ResultValueInput.SetEnable(false);
            };
            Config.prototype.CreateExecuteButton = function () {
                var _this = this;
                this.ExecuteButton = new Labsoft.UI.Button();
                this.ExecuteButton.Title = "Executar";
                this.ExecuteButton.OnClick = function () {
                    _this.Execute();
                };
                this.DOM.find("#ButtonsBar").append(this.ExecuteButton.Render());
            };
            return Config;
        }());
        Interface.Config = Config;
    })(Interface = myLIMSweb.Interface || (myLIMSweb.Interface = {}));
})(myLIMSweb || (myLIMSweb = {}));
//# sourceMappingURL=myLIMSweb.Interface.Config.js.map