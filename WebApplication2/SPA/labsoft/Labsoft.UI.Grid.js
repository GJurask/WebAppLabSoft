/// <reference path="../jquery/jquery.d.ts"/>
/// <reference path="../lodash/lodash.d.ts"/>
/// <reference path="../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="Labsoft.Template.ts"/>
var Labsoft;
(function (Labsoft) {
    var UI;
    (function (UI) {
        var Grid = /** @class */ (function () {
            function Grid() {
                this.Template = new Labsoft.Template('spa/Labsoft/Templates/Labsoft.UI.Grid.html');
            }
            Grid.prototype.Render = function () {
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
            };
            Grid.prototype.GetSelectedData = function () {
                return this.KendoGrid.dataItem(this.KendoGrid.select());
            };
            Grid.prototype.SetData = function (data) {
                this.Data = data;
                this.DOM.parent().html(this.Render());
                this.KendoGrid.refresh();
            };
            return Grid;
        }());
        UI.Grid = Grid;
    })(UI = Labsoft.UI || (Labsoft.UI = {}));
})(Labsoft || (Labsoft = {}));
//# sourceMappingURL=Labsoft.UI.Grid.js.map