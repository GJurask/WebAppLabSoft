/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>
var myLIMSweb;
(function (myLIMSweb) {
    var Interface;
    (function (Interface) {
        var Sample = /** @class */ (function () {
            function Sample() {
                this.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.Sample.html');
            }
            Sample.prototype.Render = function () {
                var self = this;
                this.DOMid = _.uniqueId("Sample_");
                this.DOM = $(this.Template.Compile(this));
                this.DOMElement = this.DOM.find("div").eq(0);
                this.CreateSections();
                this.CreateSamplesGrid();
                this.CreateSampleInfosGrid();
                this.CreateIdInput();
                this.CreateIdentificationInput();
                this.CreateEditionDateTimeInput();
                this.CreateReceiveDateInput();
                this.CreateConclusionTimeInput();
                this.CreateTimeZoneIdInput();
                this.CreateConclusionInput();
                this.CreateViewButton();
                this.CreateNewButton();
                this.CreateEditButton();
                this.CreateSaveButton();
                this.CreateCancelButton();
                this.CreateDeleteButton();
                this.GetSamples();
                this.Toogle(false);
                return this.DOM;
            };
            Sample.prototype.View = function () {
                var selectedItem = this.SamplesGrid.GetSelectedData();
                if (selectedItem) {
                    this.GetSample(selectedItem.Id);
                    this.GetSampleInfos(selectedItem.Id);
                    this.DOMElement.data("kendoTabStrip").activateTab(this.DOMElement.find("#SectionDetails"));
                }
                this.Cancel();
            };
            Sample.prototype.New = function () {
                this.Toogle(true);
                this.ClearData();
            };
            Sample.prototype.Edit = function () {
                this.Toogle(true);
            };
            Sample.prototype.Save = function () {
                var _this = this;
                this.Toogle(false);
                var data = {
                    Id: Number(this.IdInput.GetData()),
                    Identification: this.IdentificationInput.GetData()
                };
                if (data.Id) {
                    Labsoft.Ajax.Put("api/samples/" + data.Id.toString(), data, function () {
                        _this.GetSample(data.Id);
                    });
                }
                else {
                    Labsoft.Ajax.Post("api/samples/", data, function (id) {
                        _this.GetSample(id);
                    });
                }
            };
            Sample.prototype.Cancel = function () {
                this.Toogle(false);
                if (this.CurrentId) {
                    this.GetSample(this.CurrentId);
                    this.GetSampleInfos(this.CurrentId);
                }
            };
            Sample.prototype.Delete = function () {
                var _this = this;
                this.Toogle(false);
                Labsoft.Ajax.Delete("api/samples/" + this.CurrentId.toString(), function () {
                    _this.ClearData();
                    _this.Toogle(false);
                });
            };
            Sample.prototype.ClearData = function () {
                this.IdInput.SetData(null);
                this.IdentificationInput.SetData(null);
                this.EditionDateTimeInput.SetData(null);
                this.ReceiveDateInput.SetData(null);
                this.ConclusionTimeInput.SetData(null);
                this.TimeZoneIdInput.SetData(null);
                this.ConclusionInput.SetData(null);
                this.CurrentId = null;
            };
            Sample.prototype.Toogle = function (edit) {
                this.NewButton.SetVisible(!edit);
                this.EditButton.SetVisible(!edit && this.CurrentId != null);
                this.SaveButton.SetVisible(edit);
                this.CancelButton.SetVisible(edit);
                this.DeleteButton.SetVisible(!edit);
                this.IdentificationInput.SetEnable(edit);
            };
            Sample.prototype.GetSamples = function () {
                var _this = this;
                Labsoft.Ajax.Get("api/samples", null, function (data) {
                    _this.SamplesGrid.SetData(data);
                });
            };
            Sample.prototype.GetSample = function (id) {
                var _this = this;
                this.CurrentId = id;
                Labsoft.Ajax.Get("api/samples/" + id.toString(), null, function (data) {
                    _this.IdInput.SetData(data.Id);
                    _this.IdentificationInput.SetData(data.Identification);
                    _this.EditionDateTimeInput.SetData(data.EditionDateTime);
                    _this.ReceiveDateInput.SetData(data.ReceiveDate);
                    _this.ConclusionTimeInput.SetData(data.ConclusionTime);
                    _this.TimeZoneIdInput.SetData(data.TimeZoneId);
                    _this.ConclusionInput.SetData(data.Conclusion);
                    _this.Toogle(false);
                });
            };
            Sample.prototype.GetSampleInfos = function (sampleId) {
                var _this = this;
                Labsoft.Ajax.Get("api/samples/" + sampleId.toString() + "/infos", null, function (data) {
                    _this.SampleInfosGrid.SetData(data);
                });
            };
            Sample.prototype.CreateSections = function () {
                this.DOMElement.kendoTabStrip({
                    animation: {
                        open: {
                            effects: "fadeIn"
                        }
                    }
                });
            };
            Sample.prototype.CreateSamplesGrid = function () {
                this.SamplesGrid = new Labsoft.UI.Grid();
                this.SamplesGrid.Data = [];
                this.SamplesGrid.SchemaFields = {
                    Id: { type: "number" },
                    Identification: { type: "string" },
                    EditionDateTime: { type: "date" }
                };
                this.SamplesGrid.Columns = [
                    { field: "Id" },
                    { field: "Identification", title: "Identificação" },
                    { field: "EditionDateTime", title: "Data de Edição", type: "date", format: "{0:dd/MM/yyyy hh:mm:ss}" }
                ];
                this.DOMElement.find("#GridSamples").html(this.SamplesGrid.Render());
            };
            Sample.prototype.CreateIdInput = function () {
                this.IdInput = new Labsoft.UI.TextInput();
                this.IdInput.Title = "Id";
                this.IdInput.Size = 1;
                this.DOMElement.find("#IdInput").html(this.IdInput.Render());
                this.IdInput.SetEnable(false);
            };
            Sample.prototype.CreateIdentificationInput = function () {
                this.IdentificationInput = new Labsoft.UI.TextInput();
                this.IdentificationInput.Title = "Identificação";
                this.IdentificationInput.Size = 3;
                this.DOMElement.find("#IdentificationInput").html(this.IdentificationInput.Render());
                this.IdentificationInput.SetEnable(false);
            };
            Sample.prototype.CreateEditionDateTimeInput = function () {
                this.EditionDateTimeInput = new Labsoft.UI.DateTimeInput();
                this.EditionDateTimeInput.Title = "Data de Edição";
                this.EditionDateTimeInput.Size = 2;
                this.DOMElement.find("#EditionDateTimeInput").html(this.EditionDateTimeInput.Render());
                this.EditionDateTimeInput.SetEnable(false);
            };
            Sample.prototype.CreateReceiveDateInput = function () {
                this.ReceiveDateInput = new Labsoft.UI.DateTimeInput();
                this.ReceiveDateInput.Title = "Data do Recebimento";
                this.ReceiveDateInput.Size = 2;
                this.DOMElement.find("#ReceiveDateInput").html(this.ReceiveDateInput.Render());
                this.ReceiveDateInput.SetEnable(false);
            };
            Sample.prototype.CreateConclusionTimeInput = function () {
                this.ConclusionTimeInput = new Labsoft.UI.TextInput();
                this.ConclusionTimeInput.Title = "Prazo de Conclusão (dias)";
                this.ConclusionTimeInput.Size = 2;
                this.DOMElement.find("#ConclusionTimeInput").html(this.ConclusionTimeInput.Render());
                this.ConclusionTimeInput.SetEnable(false);
            };
            Sample.prototype.CreateTimeZoneIdInput = function () {
                this.TimeZoneIdInput = new Labsoft.UI.TextInput();
                this.TimeZoneIdInput.Title = "Fuso Horário";
                this.TimeZoneIdInput.Size = 2;
                this.DOMElement.find("#TimeZoneIdInput").html(this.TimeZoneIdInput.Render());
                this.TimeZoneIdInput.SetEnable(false);
            };
            Sample.prototype.CreateConclusionInput = function () {
                this.ConclusionInput = new Labsoft.UI.DateTimeInput();
                this.ConclusionInput.Title = "Data de Conclusão";
                this.ConclusionInput.Size = 2;
                this.DOMElement.find("#ConclusionInput").html(this.ConclusionInput.Render());
                this.ConclusionInput.SetEnable(false);
            };
            Sample.prototype.CreateSampleInfosGrid = function () {
                this.SampleInfosGrid = new Labsoft.UI.Grid();
                this.SampleInfosGrid.Data = [];
                this.SampleInfosGrid.SchemaFields = {
                    Id: { type: "number" },
                    Identification: { type: "string" },
                    Value: { type: "string" },
                    EditionDateTime: { type: "date" }
                };
                this.SampleInfosGrid.Columns = [
                    { field: "Id" },
                    { field: "Identification", title: "Identificação" },
                    { field: "Value", title: "Valor" },
                    { field: "EditionDateTime", title: "Data de Edição", type: "date", format: "{0:dd/MM/yyyy hh:mm:ss}", }
                ];
                this.DOMElement.find("#GridInfos").html(this.SampleInfosGrid.Render());
            };
            Sample.prototype.CreateViewButton = function () {
                var _this = this;
                this.ViewButton = new Labsoft.UI.Button();
                this.ViewButton.Title = "Visualizar";
                this.ViewButton.OnClick = function () {
                    _this.View();
                };
                this.DOMElement.find("#SectionListButtonsBar").append(this.ViewButton.Render());
            };
            Sample.prototype.CreateNewButton = function () {
                var _this = this;
                this.NewButton = new Labsoft.UI.Button();
                this.NewButton.Title = "Criar";
                this.NewButton.OnClick = function () {
                    _this.New();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.NewButton.Render());
            };
            Sample.prototype.CreateEditButton = function () {
                var _this = this;
                this.EditButton = new Labsoft.UI.Button();
                this.EditButton.Title = "Editar";
                this.EditButton.OnClick = function () {
                    _this.Edit();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.EditButton.Render());
            };
            Sample.prototype.CreateSaveButton = function () {
                var _this = this;
                this.SaveButton = new Labsoft.UI.Button();
                this.SaveButton.Title = "Salvar";
                this.SaveButton.OnClick = function () {
                    _this.Save();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.SaveButton.Render());
            };
            Sample.prototype.CreateCancelButton = function () {
                var _this = this;
                this.CancelButton = new Labsoft.UI.Button();
                this.CancelButton.Title = "Cancelar";
                this.CancelButton.OnClick = function () {
                    _this.Cancel();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.CancelButton.Render());
            };
            Sample.prototype.CreateDeleteButton = function () {
                var _this = this;
                this.DeleteButton = new Labsoft.UI.Button();
                this.DeleteButton.Title = "Excluir";
                this.DeleteButton.OnClick = function () {
                    _this.Delete();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.DeleteButton.Render());
            };
            return Sample;
        }());
        Interface.Sample = Sample;
    })(Interface = myLIMSweb.Interface || (myLIMSweb.Interface = {}));
})(myLIMSweb || (myLIMSweb = {}));
//# sourceMappingURL=myLIMSweb.Interface.Sample.js.map