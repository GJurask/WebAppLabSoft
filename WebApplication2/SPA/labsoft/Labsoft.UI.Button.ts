/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>

module Labsoft {
    export module UI {
        export class Button {

            constructor() {

            }

            public DOM: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.Button.html');

            public Title: string;
            public OnClick: () => void;

            Render() {
                var self = this;

                this.DOMid = _.uniqueId("Button_");
                this.DOM = $(this.Template.Compile(this));

                this.DOM.on("click",() => {
                    if (this.OnClick)
                        this.OnClick();
                });

                return this.DOM;
            }

            public SetEnable(enable: boolean) {
                this.DOM.enable(enable);
            }

            public SetVisible(visible: boolean) {
                if (visible)
                    this.DOM.show();
                else
                    this.DOM.hide();
            }
        }
    }
} 