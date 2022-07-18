/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>
var myLIMSweb;
(function (myLIMSweb) {
    var Interface;
    (function (Interface) {
        var Dates = (function () {
            function Dates() {
                this.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.Dates.html');
            }
            Dates.prototype.Render = function () {
                var self = this;
                this.DOMid = _.uniqueId("Dates_");
                this.DOM = $(this.Template.Compile(this));
                this.CreateDateInput();
                this.CreateWorkingDaysInput();
                this.CreateConclusionDateInput();
                this.CreateCalculateButton();
                return this.DOM;
            };
            Dates.prototype.Calculate = function () {
                var _this = this;
                var date = this.DateInput.GetData();
                Labsoft.Ajax.Get("api/configs/DateFromWorkingDays?date=" + date.toISOString() + "&workingDays=" + this.WorkingDaysInput.GetData(), null, function (data) {
                    _this.ConclusionDateInput.SetData(data);
                });
            };
            Dates.prototype.CreateDateInput = function () {
                this.DateInput = new Labsoft.UI.DateTimeInput();
                this.DateInput.Title = "Data";
                this.DateInput.Size = 2;
                this.DOM.find("#DateInput").html(this.DateInput.Render());
                this.DateInput.SetData("2017-12-22T23:00:00");
                this.DateInput.SetEnable(false);
            };
            Dates.prototype.CreateWorkingDaysInput = function () {
                this.WorkingDaysInput = new Labsoft.UI.TextInput();
                this.WorkingDaysInput.Title = "Dias Úteis";
                this.WorkingDaysInput.Size = 2;
                this.DOM.find("#WorkingDaysInput").html(this.WorkingDaysInput.Render());
                this.WorkingDaysInput.SetData(14);
                this.WorkingDaysInput.SetEnable(false);
            };
            Dates.prototype.CreateConclusionDateInput = function () {
                this.ConclusionDateInput = new Labsoft.UI.DateTimeInput();
                this.ConclusionDateInput.Title = "Conclusão";
                this.ConclusionDateInput.Size = 2;
                this.DOM.find("#ConclusionDateInput").html(this.ConclusionDateInput.Render());
                this.ConclusionDateInput.SetEnable(false);
            };
            Dates.prototype.CreateCalculateButton = function () {
                var _this = this;
                this.CalculateButton = new Labsoft.UI.Button();
                this.CalculateButton.Title = "Calcular";
                this.CalculateButton.OnClick = function () {
                    _this.Calculate();
                };
                this.DOM.find("#ButtonsBar").append(this.CalculateButton.Render());
            };
            return Dates;
        })();
        Interface.Dates = Dates;
    })(Interface = myLIMSweb.Interface || (myLIMSweb.Interface = {}));
})(myLIMSweb || (myLIMSweb = {}));
//# sourceMappingURL=myLIMSweb.Interface.Dates.js.map