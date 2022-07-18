using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class SampleType
    {
        Context DataContext;

        public SampleType()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region SampleTypes

        public List<Models.SampleType> GetAll()
        {
            return DataContext.SampleTypes
                .ToList();
        }

        public Models.SampleType GetById(int sampleTypeId)
        {
            return DataContext.SampleTypes
                .Where(x => x.Id == sampleTypeId)
                .FirstOrDefault();
        }

        public int Insert(Models.SampleType sampleType)
        {
            sampleType.EditionDateTime = DateTime.UtcNow;

            DataContext.SampleTypes.Add(sampleType);
            DataContext.SaveChanges();

            return sampleType.Id;
        }

        public void Update(int sampleTypeId, Models.SampleType sampleTypeUpdate)
        {
            if (sampleTypeUpdate.Id != sampleTypeId)
                throw new Exception("Incompatible Data!");

            Models.SampleType sampleType = DataContext.SampleTypes
                .Where(x => x.Id == sampleTypeId)
                .FirstOrDefault();

            sampleType.Identification = sampleTypeUpdate.Identification;
            sampleType.EditionDateTime = DateTime.UtcNow;

            DataContext.MarkAsModified(sampleType);
            DataContext.SaveChanges();
        }

        public void Delete(int sampleTypeId)
        {
            Models.SampleType sampleType = DataContext.SampleTypes
                .Where(x => x.Id == sampleTypeId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(sampleType);
            DataContext.SaveChanges();
        }

        #endregion
    }
}