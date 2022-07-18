/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>
var myLIMSweb;
(function (myLIMSweb) {
    var Interface;
    (function (Interface) {
        var SampleType = /** @class */ (function () {
            function SampleType() {
                this.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.SampleType.html');
            }
            SampleType.prototype.Render = function () {
                var self = this;
                console.log('rt');
                this.DOMid = _.uniqueId("SampleType_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").eq(0);
                this.CreateSections();
                this.CreateSampleTypesGrid();
                this.CreateIdInput();
                this.CreateIdentificationInput();
                this.CreateEditionDateTimeInput();
                this.CreateViewButton();
                this.CreateNewButton();
                this.CreateEditButton();
                this.CreateSaveButton();
                this.CreateCancelButton();
                this.CreateDeleteButton();
                this.GetSampleTypes();
                this.Toogle(false);
                return this.DOM;
            };
            SampleType.prototype.View = function () {
                var selectedItem = this.SampleTypesGrid.GetSelectedData();
                if (selectedItem) {
                    this.GetSampleType(selectedItem.Id);
                    this.DOMElement.data("kendoTabStrip").activateTab(this.DOMElement.find("#SectionDetails"));
                }
                this.Cancel();
            };
            SampleType.prototype.New = function () {
                this.Toogle(true);
                this.ClearData();
            };
            SampleType.prototype.Edit = function () {
                this.Toogle(true);
            };
            SampleType.prototype.Save = function () {
                var _this = this;
                this.Toogle(false);
                var data = {
                    Id: Number(this.IdInput.GetData()),
                    Identification: this.IdentificationInput.GetData()
                };
                if (data.Id) {
                    Labsoft.Ajax.Put("api/sampleTypes/" + data.Id.toString(), data, function () {
                        _this.GetSampleType(data.Id);
                    });
                }
                else {
                    Labsoft.Ajax.Post("api/sampleTypes/", data, function (id) {
                        _this.GetSampleType(id);
                    });
                }
            };
            SampleType.prototype.Cancel = function () {
                this.Toogle(false);
                if (this.CurrentId) {
                    this.GetSampleType(this.CurrentId);
                }
            };
            SampleType.prototype.Delete = function () {
                var _this = this;
                this.Toogle(false);
                Labsoft.Ajax.Delete("api/sampleTypes/" + this.CurrentId.toString(), function () {
                    _this.ClearData();
                    _this.Toogle(false);
                });
            };
            SampleType.prototype.ClearData = function () {
                this.IdInput.SetData(null);
                this.IdentificationInput.SetData(null);
                this.EditionDateTimeInput.SetData(null);
                this.CurrentId = null;
            };
            SampleType.prototype.Toogle = function (edit) {
                this.NewButton.SetVisible(!edit);
                this.EditButton.SetVisible(!edit && this.CurrentId != null);
                this.SaveButton.SetVisible(edit);
                this.CancelButton.SetVisible(edit);
                this.DeleteButton.SetVisible(!edit);
                this.IdentificationInput.SetEnable(edit);
            };
            SampleType.prototype.GetSampleTypes = function () {
                var _this = this;
                Labsoft.Ajax.Get("api/sampleTypes", null, function (data) {
                    _this.SampleTypesGrid.SetData(data);
                });
            };
            SampleType.prototype.GetSampleType = function (id) {
                var _this = this;
                this.CurrentId = id;
                Labsoft.Ajax.Get("api/sampleTypes/" + id.toString(), null, function (data) {
                    _this.IdInput.SetData(data.Id);
                    _this.IdentificationInput.SetData(data.Identification);
                    _this.EditionDateTimeInput.SetData(data.EditionDateTime);
                    _this.Toogle(false);
                });
            };
            SampleType.prototype.CreateSections = function () {
                this.DOMElement.kendoTabStrip({
                    animation: {
                        open: {
                            effects: "fadeIn"
                        }
                    }
                });
            };
            SampleType.prototype.CreateSampleTypesGrid = function () {
                this.SampleTypesGrid = new Labsoft.UI.Grid();
                this.SampleTypesGrid.Data = [];
                this.SampleTypesGrid.SchemaFields = {
                    Id: { type: "number" },
                    Identification: { type: "string" },
                    EditionDateTime: { type: "date" }
                };
                this.SampleTypesGrid.Columns = [
                    { field: "Id" },
                    { field: "Identification", title: "Identificação" },
                    { field: "EditionDateTime", title: "Data de Edição", type: "date", format: "{0:dd/MM/yyyy hh:mm:ss}" }
                ];
                this.DOMElement.find("#GridSampleTypes").html(this.SampleTypesGrid.Render());
            };
            SampleType.prototype.CreateIdInput = function () {
                this.IdInput = new Labsoft.UI.TextInput();
                this.IdInput.Title = "Id";
                this.IdInput.Size = 1;
                this.DOMElement.find("#IdInput").html(this.IdInput.Render());
                this.IdInput.SetEnable(false);
            };
            SampleType.prototype.CreateIdentificationInput = function () {
                this.IdentificationInput = new Labsoft.UI.TextInput();
                this.IdentificationInput.Title = "Identificação";
                this.IdentificationInput.Size = 3;
                this.DOMElement.find("#IdentificationInput").html(this.IdentificationInput.Render());
                this.IdentificationInput.SetEnable(false);
            };
            SampleType.prototype.CreateEditionDateTimeInput = function () {
                this.EditionDateTimeInput = new Labsoft.UI.DateTimeInput();
                this.EditionDateTimeInput.Title = "Data de Edição";
                this.EditionDateTimeInput.Size = 2;
                this.DOMElement.find("#EditionDateTimeInput").html(this.EditionDateTimeInput.Render());
                this.EditionDateTimeInput.SetEnable(false);
            };
            SampleType.prototype.CreateViewButton = function () {
                var _this = this;
                this.ViewButton = new Labsoft.UI.Button();
                this.ViewButton.Title = "Visualizar";
                this.ViewButton.OnClick = function () {
                    _this.View();
                };
                this.DOMElement.find("#SectionListButtonsBar").append(this.ViewButton.Render());
            };
            SampleType.prototype.CreateNewButton = function () {
                var _this = this;
                this.NewButton = new Labsoft.UI.Button();
                this.NewButton.Title = "Criar";
                this.NewButton.OnClick = function () {
                    _this.New();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.NewButton.Render());
            };
            SampleType.prototype.CreateEditButton = function () {
                var _this = this;
                this.EditButton = new Labsoft.UI.Button();
                this.EditButton.Title = "Editar";
                this.EditButton.OnClick = function () {
                    _this.Edit();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.EditButton.Render());
            };
            SampleType.prototype.CreateSaveButton = function () {
                var _this = this;
                this.SaveButton = new Labsoft.UI.Button();
                this.SaveButton.Title = "Salvar";
                this.SaveButton.OnClick = function () {
                    _this.Save();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.SaveButton.Render());
            };
            SampleType.prototype.CreateCancelButton = function () {
                var _this = this;
                this.CancelButton = new Labsoft.UI.Button();
                this.CancelButton.Title = "Cancelar";
                this.CancelButton.OnClick = function () {
                    _this.Cancel();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.CancelButton.Render());
            };
            SampleType.prototype.CreateDeleteButton = function () {
                var _this = this;
                this.DeleteButton = new Labsoft.UI.Button();
                this.DeleteButton.Title = "Excluir";
                this.DeleteButton.OnClick = function () {
                    _this.Delete();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.DeleteButton.Render());
            };
            return SampleType;
        }());
        Interface.SampleType = SampleType;
    })(Interface = myLIMSweb.Interface || (myLIMSweb.Interface = {}));
})(myLIMSweb || (myLIMSweb = {}));
//# sourceMappingURL=myLIMSweb.Interface.SampleType.js.map