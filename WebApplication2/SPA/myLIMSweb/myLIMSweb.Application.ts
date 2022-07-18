

module myLIMSweb {
    export class Application {

        constructor() {

        }

        Start(body: JQuery) {

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
            
        }
    }
} 