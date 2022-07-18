/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>

module Labsoft {
    export module UI {
        export class DateTimeInput {

            constructor() {

            }

            public DOM: JQuery;
            public DOMElement: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.DateTimeInput.html');

            public Title: string;
            public Size: number;
            public KendoDateTimePicker: any;

            Render() {
                var self = this;

                this.DOMid = _.uniqueId("DateTimeInput_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").find("input").eq(0);

                this.DOMElement.kendoDateTimePicker({
                    //dateInput: true
                });

                this.KendoDateTimePicker = this.DOMElement.data("kendoDateTimePicker");

                return this.DOM;
            }

            public GetData() {
                return this.KendoDateTimePicker.value();
            }

            public SetData(data: any) {
                this.KendoDateTimePicker.value(data);
            }

            public SetEnable(enable: boolean) {
                this.KendoDateTimePicker.enable(enable);
            }
        }
    }
} 