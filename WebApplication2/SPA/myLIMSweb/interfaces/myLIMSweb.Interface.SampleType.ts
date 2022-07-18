/// <reference path="../../jquery/jquery.d.ts"/>
/// <reference path="../../lodash/lodash.d.ts"/>
/// <reference path="../../kendo/typescript/kendo.all.d.ts"/>
/// <reference path="../../labsoft/Labsoft.Template.ts"/>
/// <reference path="../../labsoft/Labsoft.Ajax.ts"/>

module myLIMSweb {
    export module Interface {
        export class SampleType {

            constructor() {

            }

            public DOM: JQuery;
            public DOMElement: JQuery;
            public DOMid: string;
            public Template: Labsoft.Template = new Labsoft.Template('spa/myLIMSweb/templates/myLIMSweb.Interface.SampleType.html');

            public SampleTypesGrid: Labsoft.UI.Grid;

            public IdInput: Labsoft.UI.TextInput;
            public IdentificationInput: Labsoft.UI.TextInput;
            public EditionDateTimeInput: Labsoft.UI.DateTimeInput;

            public ViewButton: Labsoft.UI.Button;
            public NewButton: Labsoft.UI.Button;
            public EditButton: Labsoft.UI.Button;
            public SaveButton: Labsoft.UI.Button;
            public CancelButton: Labsoft.UI.Button;
            public DeleteButton: Labsoft.UI.Button;

            public CurrentId: number;

            Render() {
                var self = this;
                console.log('rt')

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
            }

            public View() {                  
                var selectedItem = this.SampleTypesGrid.GetSelectedData();

                if (selectedItem) {
                    this.GetSampleType(selectedItem.Id);
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
                    Labsoft.Ajax.Put("api/sampleTypes/" + data.Id.toString(), data,() => {
                        this.GetSampleType(data.Id);
                    });
                } else {
                    Labsoft.Ajax.Post("api/sampleTypes/", data,(id) => {
                        this.GetSampleType(id);
                    });
                }
            }

            public Cancel() {
                this.Toogle(false);

                if (this.CurrentId) {
                    this.GetSampleType(this.CurrentId);
                }
            }

            public Delete() {
                this.Toogle(false);

                Labsoft.Ajax.Delete("api/sampleTypes/" + this.CurrentId.toString(), () => {
                    this.ClearData();
                    this.Toogle(false);
                });
            }

            public ClearData() {
                this.IdInput.SetData(null);
                this.IdentificationInput.SetData(null);
                this.EditionDateTimeInput.SetData(null);
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

            public GetSampleTypes() {
                Labsoft.Ajax.Get("api/sampleTypes", null,(data) => {
                    this.SampleTypesGrid.SetData(data);
                });
            }

            public GetSampleType(id: number) {
                this.CurrentId = id;

                Labsoft.Ajax.Get("api/sampleTypes/" + id.toString(), null,(data) => {
                    this.IdInput.SetData(data.Id);
                    this.IdentificationInput.SetData(data.Identification);
                    this.EditionDateTimeInput.SetData(data.EditionDateTime);
                    this.Toogle(false);
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

            public CreateSampleTypesGrid() {
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