namespace WebApplication2.Migrations
{
    using DataAccess;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataAccess.Context>
    {
        public Context DataContext;

        public Configuration()
        {
            AutomaticMigrationsEnabled = false;

            DataContext = new Context();
        }

        public void ForceSeed(Context context)
        {
            this.Seed(context);
        }

        protected override void Seed(DataAccess.Context context)
        {
            Models.SampleClass sampleClass;

            sampleClass = new Models.SampleClass();
            sampleClass.Id = 1;
            sampleClass.Identification = "Normal";

            DataContext.SampleClasses.AddOrUpdate(sampleClass);

            sampleClass = new Models.SampleClass();
            sampleClass.Id = 2;
            sampleClass.Identification = "Controle";

            DataContext.SampleClasses.AddOrUpdate(sampleClass);

            Models.Sample sample;

            sample = new Models.Sample();
            sample.Id = 1;
            sample.Identification = "Avaliação";
            sample.ReceiveDate = DateTime.Parse("2017-12-23T01:00:00.00Z").ToUniversalTime();
            sample.ConclusionTime = 14;
            sample.TimeZoneId = TimeZoneInfo.Local.Id;

            DataContext.Samples.AddOrUpdate(sample);

            Models.SampleInfo sampleInfo;

            sampleInfo = new Models.SampleInfo();
            sampleInfo.Id = 1;
            sampleInfo.SampleId = 1;
            sampleInfo.Identification = "Lote";
            sampleInfo.Value = "Água L6512";
            sampleInfo.EditionDateTime = DateTime.Parse("2018-01-10T14:00:00.00Z").ToUniversalTime();

            DataContext.SampleInfos.AddOrUpdate(sampleInfo);

            sampleInfo = new Models.SampleInfo();
            sampleInfo.Id = 2;
            sampleInfo.SampleId = 1;
            sampleInfo.Identification = "Lote";
            sampleInfo.Value = "Solo L6541";
            sampleInfo.EditionDateTime = DateTime.Parse("2018-01-13T14:00:00.00Z").ToUniversalTime();

            DataContext.SampleInfos.AddOrUpdate(sampleInfo);

            sampleInfo = new Models.SampleInfo();
            sampleInfo.Id = 3;
            sampleInfo.SampleId = 1;
            sampleInfo.Identification = "Lote";
            sampleInfo.Value = "Água L6512";
            sampleInfo.EditionDateTime = null;

            DataContext.SampleInfos.AddOrUpdate(sampleInfo);

            sampleInfo = new Models.SampleInfo();
            sampleInfo.Id = 4;
            sampleInfo.SampleId = 1;
            sampleInfo.Identification = "Lote";
            sampleInfo.Value = "Água L6512";
            sampleInfo.EditionDateTime = DateTime.Parse("2018-01-10T14:00:00.00Z").ToUniversalTime();

            DataContext.SampleInfos.AddOrUpdate(sampleInfo);

            sampleInfo = new Models.SampleInfo();
            sampleInfo.Id = 5;
            sampleInfo.SampleId = 1;
            sampleInfo.Identification = "Lote";
            sampleInfo.Value = "Solo L6541";
            sampleInfo.EditionDateTime = DateTime.Parse("2018-01-12T14:00:00.00Z").ToUniversalTime();

            DataContext.SampleInfos.AddOrUpdate(sampleInfo);

            DataContext.SaveChanges();
        }
    }
}
