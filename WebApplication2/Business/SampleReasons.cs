using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class SampleReason
    {
        Context DataContext;

        public SampleReason()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region SampleReasons

        public List<Models.SampleReason> GetAll()
        {
            return DataContext.SampleReasons
                .ToList();
        }

        public Models.SampleReason GetById(int sampleReasonId)
        {
            return DataContext.SampleReasons
                .Where(x => x.Id == sampleReasonId)
                .FirstOrDefault();
        }

        public int Insert(Models.SampleReason sampleReason)
        {
            sampleReason.EditionDateTime = DateTime.UtcNow;

            DataContext.SampleReasons.Add(sampleReason);
            DataContext.SaveChanges();

            return sampleReason.Id;
        }

        public void Update(int sampleReasonId, Models.SampleReason sampleReasonUpdate)
        {
            if (sampleReasonUpdate.Id != sampleReasonId)
                throw new Exception("Incompatible Data!");

            Models.SampleReason sampleReason = DataContext.SampleReasons
                .Where(x => x.Id == sampleReasonId)
                .FirstOrDefault();

            sampleReason.Identification = sampleReasonUpdate.Identification;
            sampleReason.EditionDateTime = DateTime.UtcNow;

            DataContext.MarkAsModified(sampleReason);
            DataContext.SaveChanges();
        }

        public void Delete(int sampleReasonId)
        {
            Models.SampleReason sampleReason = DataContext.SampleReasons
                .Where(x => x.Id == sampleReasonId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(sampleReason);
            DataContext.SaveChanges();
        }

        #endregion
    }
}