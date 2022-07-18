/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>

module Labsoft {
    export module UI {
        export class Grid {

            constructor() {

            }

            public DOM: JQuery;
            public DOMElement: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.Grid.html');

            public Data: any[];
            public SchemaFields: any;
            public Columns: any[];
            public Sortable: any;

            public KendoGrid: any;

            Render() {
                var self = this;

                this.DOMid = _.uniqueId("Grid_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").eq(0);

                this.DOMElement.kendoGrid({
                    dataSource: {
                        data: this.Data,
                        schema: {
                            model: {
                                fields: this.SchemaFields
                            }
                        },
                        pageSize: 20
                    },
                    height: 550,
                    scrollable: { virtual: false },
                    sortable: {
                        allowUnsort: true, mode: "multiple",
                    },
                    filterable: {
                        mode: "menu"
                    },
                    pageable: {
                        input: true,
                        numeric: false
                    },
                    selectable: "row",
                    columns: this.Columns
                });

                this.KendoGrid = this.DOMElement.data("kendoGrid");

                return this.DOM;
            }

            public GetSelectedData() {
                return this.KendoGrid.dataItem(this.KendoGrid.select());
            }

            public SetData(data: any) {
                this.Data = data;

                this.DOM.parent().html(this.Render());
                this.KendoGrid.refresh();
            }
        }
    }
} 