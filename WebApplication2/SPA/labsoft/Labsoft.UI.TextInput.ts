/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>

module Labsoft {
    export module UI {
        export class TextInput {

            constructor() {

            }

            public DOM: JQuery;
            public DOMElement: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.TextInput.html');

            public Title: string;
            public Size: number;

            Render() {
                var self = this;

                this.DOMid = _.uniqueId("DateTimeInput_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").find("input").eq(0);

                return this.DOM;
            }

            public GetData() {
                return this.DOMElement.val();
            }

            public SetData(data: any) {
                this.DOMElement.val(data);
            }

            public SetEnable(enable: boolean) {
                this.DOMElement.enable(enable);
            }
        }
    }
} 