using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class SampleClass
    {
        Context DataContext;

        public SampleClass()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region SampleClasses

        public List<Models.SampleClass> GetAll()
        {
            return DataContext.SampleClasses
                .ToList();
        }

        public Models.SampleClass GetById(int sampleClassId)
        {
            return DataContext.SampleClasses
                .Where(x => x.Id == sampleClassId)
                .FirstOrDefault();
        }

        public int Insert(Models.SampleClass sampleClass)
        {
            sampleClass.EditionDateTime = DateTime.UtcNow;

            DataContext.SampleClasses.Add(sampleClass);
            DataContext.SaveChanges();

            return sampleClass.Id;
        }

        public void Update(int sampleClassId, Models.SampleClass sampleClassUpdate)
        {
            if (sampleClassUpdate.Id != sampleClassId)
                throw new Exception("Incompatible Data!");

            Models.SampleClass sampleClass = DataContext.SampleClasses
                .Where(x => x.Id == sampleClassId)
                .FirstOrDefault();

            sampleClass.Identification = sampleClassUpdate.Identification;
            sampleClass.EditionDateTime = DateTime.UtcNow;

            DataContext.MarkAsModified(sampleClass);
            DataContext.SaveChanges();
        }

        public void Delete(int sampleClassId)
        {
            Models.SampleClass sampleClass = DataContext.SampleClasses
                .Where(x => x.Id == sampleClassId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(sampleClass);
            DataContext.SaveChanges();
        }

        #endregion
    }
}