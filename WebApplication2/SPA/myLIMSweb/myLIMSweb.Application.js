var myLIMSweb;
(function (myLIMSweb) {
    var Application = /** @class */ (function () {
        function Application() {
        }
        Application.prototype.Start = function (body) {
            kendo.culture("pt-BR");
            $("#menu").kendoMenu();
            $("#form_Sample").on("click", function () {
                body.find("#InterfaceContent").html(new myLIMSweb.Interface.Sample().Render());
            });
            $("#form_SampleType").on("click", function () {
                body.find("#InterfaceContent").html(new myLIMSweb.Interface.SampleType().Render());
            });
            $("#form_SampleReason").on("click", function () {
                body.find("#InterfaceContent").html(new myLIMSweb.Interface.SampleReason().Render());
            });
            $("#form_Config").on("click", function () {
                body.find("#InterfaceContent").html(new myLIMSweb.Interface.Config().Render());
            });
        };
        return Application;
    }());
    myLIMSweb.Application = Application;
})(myLIMSweb || (myLIMSweb = {}));
//# sourceMappingURL=myLIMSweb.Application.js.map