/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>

module myLIMSweb {
    export module Interface {
        export class Sample {

            constructor() {

            }

            public DOM: JQuery;
            public DOMElement: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.Sample.html');

            public SamplesGrid: Labsoft.UI.Grid;
            public SampleInfosGrid: Labsoft.UI.Grid;

            public IdInput: Labsoft.UI.TextInput;
            public IdentificationInput: Labsoft.UI.TextInput;
            public EditionDateTimeInput: Labsoft.UI.DateTimeInput;
            public ReceiveDateInput: Labsoft.UI.DateTimeInput;
            public ConclusionTimeInput: Labsoft.UI.TextInput;
            public TimeZoneIdInput: Labsoft.UI.TextInput;
            public ConclusionInput: Labsoft.UI.DateTimeInput;

            public ViewButton: Labsoft.UI.Button;
            public NewButton: Labsoft.UI.Button;
            public EditButton: Labsoft.UI.Button;
            public SaveButton: Labsoft.UI.Button;
            public CancelButton: Labsoft.UI.Button;
            public DeleteButton: Labsoft.UI.Button;

            public CurrentId: number;

            Render() {
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
            }

            public View() {                  
                var selectedItem = this.SamplesGrid.GetSelectedData();

                if (selectedItem) {
                    this.GetSample(selectedItem.Id);
                    this.GetSampleInfos(selectedItem.Id);
                    this.DOMElement.data("kendoTabStrip").activateTab(this.DOMElement.find("#SectionDetails"));
                }

                this.Cancel();
            }

            public New() {
                this.Toogle(true);

                this.ClearData();
            }

            public Edit() {
                this.Toogle(true);
            }

            public Save() {
                this.Toogle(false);

                var data = {
                    Id: Number(this.IdInput.GetData()),
                    Identification: this.IdentificationInput.GetData()
                };

                if (data.Id) {
                    Labsoft.Ajax.Put("api/samples/" + data.Id.toString(), data,() => {
                        this.GetSample(data.Id);
                    });
                } else {
                    Labsoft.Ajax.Post("api/samples/", data,(id) => {
                        this.GetSample(id);
                    });
                }
            }

            public Cancel() {
                this.Toogle(false);

                if (this.CurrentId) {
                    this.GetSample(this.CurrentId);
                    this.GetSampleInfos(this.CurrentId);
                }
            }

            public Delete() {
                this.Toogle(false);

                Labsoft.Ajax.Delete("api/samples/" + this.CurrentId.toString(), () => {
                    this.ClearData();
                    this.Toogle(false);
                });
            }

            public ClearData() {
                this.IdInput.SetData(null);
                this.IdentificationInput.SetData(null);
                this.EditionDateTimeInput.SetData(null);
                this.ReceiveDateInput.SetData(null);
                this.ConclusionTimeInput.SetData(null);
                this.TimeZoneIdInput.SetData(null);
                this.ConclusionInput.SetData(null);
                this.CurrentId = null;
            }

            public Toogle(edit: boolean) {
                this.NewButton.SetVisible(!edit);
                this.EditButton.SetVisible(!edit && this.CurrentId != null);
                this.SaveButton.SetVisible(edit);
                this.CancelButton.SetVisible(edit);
                this.DeleteButton.SetVisible(!edit);
                this.IdentificationInput.SetEnable(edit);
            }

            public GetSamples() {
                Labsoft.Ajax.Get("api/samples", null,(data) => {
                    this.SamplesGrid.SetData(data);
                });
            }

            public GetSample(id: number) {
                this.CurrentId = id;

                Labsoft.Ajax.Get("api/samples/" + id.toString(), null,(data) => {
                    this.IdInput.SetData(data.Id);
                    this.IdentificationInput.SetData(data.Identification);
                    this.EditionDateTimeInput.SetData(data.EditionDateTime);
                    this.ReceiveDateInput.SetData(data.ReceiveDate);
                    this.ConclusionTimeInput.SetData(data.ConclusionTime);
                    this.TimeZoneIdInput.SetData(data.TimeZoneId);
                    this.ConclusionInput.SetData(data.Conclusion);
                    this.Toogle(false);
                });
            }

            public GetSampleInfos(sampleId: number) {
                Labsoft.Ajax.Get("api/samples/" + sampleId.toString() + "/infos", null,(data) => {
                    this.SampleInfosGrid.SetData(data);
                });
            }

            public CreateSections() {
                this.DOMElement.kendoTabStrip({
                    animation: {
                        open: {
                            effects: "fadeIn"
                        }
                    }
                });
            }

            public CreateSamplesGrid() {
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
            }

            public CreateIdInput() {
                this.IdInput = new Labsoft.UI.TextInput()
                this.IdInput.Title = "Id";
                this.IdInput.Size = 1;
                this.DOMElement.find("#IdInput").html(this.IdInput.Render());
                this.IdInput.SetEnable(false);
            }

            public CreateIdentificationInput() {
                this.IdentificationInput = new Labsoft.UI.TextInput()
                this.IdentificationInput.Title = "Identificação";
                this.IdentificationInput.Size = 3;
                this.DOMElement.find("#IdentificationInput").html(this.IdentificationInput.Render());
                this.IdentificationInput.SetEnable(false);
            }

            public CreateEditionDateTimeInput() {
                this.EditionDateTimeInput = new Labsoft.UI.DateTimeInput()
                this.EditionDateTimeInput.Title = "Data de Edição";
                this.EditionDateTimeInput.Size = 2;
                this.DOMElement.find("#EditionDateTimeInput").html(this.EditionDateTimeInput.Render());
                this.EditionDateTimeInput.SetEnable(false);
            }

            public CreateReceiveDateInput() {
                this.ReceiveDateInput = new Labsoft.UI.DateTimeInput()
                this.ReceiveDateInput.Title = "Data do Recebimento";
                this.ReceiveDateInput.Size = 2;
                this.DOMElement.find("#ReceiveDateInput").html(this.ReceiveDateInput.Render());
                this.ReceiveDateInput.SetEnable(false);
            }

            public CreateConclusionTimeInput() {
                this.ConclusionTimeInput = new Labsoft.UI.TextInput()
                this.ConclusionTimeInput.Title = "Prazo de Conclusão (dias)";
                this.ConclusionTimeInput.Size = 2;
                this.DOMElement.find("#ConclusionTimeInput").html(this.ConclusionTimeInput.Render());
                this.ConclusionTimeInput.SetEnable(false);
            }

            public CreateTimeZoneIdInput() {
                this.TimeZoneIdInput = new Labsoft.UI.TextInput()
                this.TimeZoneIdInput.Title = "Fuso Horário";
                this.TimeZoneIdInput.Size = 2;
                this.DOMElement.find("#TimeZoneIdInput").html(this.TimeZoneIdInput.Render());
                this.TimeZoneIdInput.SetEnable(false);
            }
            
            public CreateConclusionInput() {
                this.ConclusionInput = new Labsoft.UI.DateTimeInput()
                this.ConclusionInput.Title = "Data de Conclusão";
                this.ConclusionInput.Size = 2;
                this.DOMElement.find("#ConclusionInput").html(this.ConclusionInput.Render());
                this.ConclusionInput.SetEnable(false);
            }

            public CreateSampleInfosGrid() {
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
            }

            public CreateViewButton() {
                this.ViewButton = new Labsoft.UI.Button();
                this.ViewButton.Title = "Visualizar";
                this.ViewButton.OnClick = () => {
                    this.View();
                };
                this.DOMElement.find("#SectionListButtonsBar").append(this.ViewButton.Render());
            }

            public CreateNewButton() {
                this.NewButton = new Labsoft.UI.Button();
                this.NewButton.Title = "Criar";
                this.NewButton.OnClick = () => {
                    this.New();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.NewButton.Render());
            }

            public CreateEditButton() {
                this.EditButton = new Labsoft.UI.Button();
                this.EditButton.Title = "Editar";
                this.EditButton.OnClick = () => {
                    this.Edit();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.EditButton.Render());
            }

            public CreateSaveButton() {
                this.SaveButton = new Labsoft.UI.Button();
                this.SaveButton.Title = "Salvar";
                this.SaveButton.OnClick = () => {
                    this.Save();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.SaveButton.Render());
            }

            public CreateCancelButton() {
                this.CancelButton = new Labsoft.UI.Button();
                this.CancelButton.Title = "Cancelar";
                this.CancelButton.OnClick = () => {
                    this.Cancel();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.CancelButton.Render());
            }

            public CreateDeleteButton() {
                this.DeleteButton = new Labsoft.UI.Button();
                this.DeleteButton.Title = "Excluir";
                this.DeleteButton.OnClick = () => {
                    this.Delete();
                };
                this.DOMElement.find("#SectionDetailsButtonsBar").append(this.DeleteButton.Render());
            }
        }
    }
} 