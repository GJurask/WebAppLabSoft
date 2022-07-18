/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>

module myLIMSweb {
    export module Interface {
        export class Config {

            constructor() {

            }

            public DOM: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.Config.html');

            public ExpectedValueInput: Labsoft.UI.TextInput;
            public ResultValueInput: Labsoft.UI.TextInput;

            public ExecuteButton: Labsoft.UI.Button;

            Render() {
                var self = this;

                this.DOMid = _.uniqueId("Config_");
                this.DOM = $(this.Template.Compile(this));

                this.CreateExpectedValueInput();
                this.CreateResultValueInput();

                this.CreateExecuteButton();

                return this.DOM;
            }

            public Execute() {
                Labsoft.Ajax.Get("api/configs", null,(data) => {
                    this.ExpectedValueInput.SetData("Resultado esperado 0.000100");
                    this.ResultValueInput.SetData(data);
                });
            }

            public CreateExpectedValueInput() {
                this.ExpectedValueInput = new Labsoft.UI.TextInput()
                this.ExpectedValueInput.Title = "Valor Esperado";
                this.ExpectedValueInput.Size = 3;
                this.DOM.find("#ExpectedValueInput").html(this.ExpectedValueInput.Render());
                this.ExpectedValueInput.SetEnable(false);
            }

            public CreateResultValueInput() {
                this.ResultValueInput = new Labsoft.UI.TextInput()
                this.ResultValueInput.Title = "Valor Obtido";
                this.ResultValueInput.Size = 3;
                this.DOM.find("#ResultValueInput").html(this.ResultValueInput.Render());
                this.ResultValueInput.SetEnable(false);
            }

            public CreateExecuteButton() {
                this.ExecuteButton = new Labsoft.UI.Button();
                this.ExecuteButton.Title = "Executar";
                this.ExecuteButton.OnClick = () => {
                    this.Execute();
                };
                this.DOM.find("#ButtonsBar").append(this.ExecuteButton.Render());
            }
        }
    }
} 