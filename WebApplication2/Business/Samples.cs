using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class Sample
    {
        Context DataContext;

        public Sample()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region Samples

        public List<Models.Sample> GetAll()
        {
            return DataContext.Samples
                .ToList();
        }

        public Models.Sample GetById(int sampleId)
        {
            return DataContext.Samples
                .Where(x => x.Id == sampleId)
                .FirstOrDefault();
        }

        private DateTime? calculateConclusionDate(DateTime? receiveDate, int? conclusionTime)
        {
            if (receiveDate != null && conclusionTime != null){
                if (conclusionTime <= 0)
                    return receiveDate;
                DateTime date = receiveDate.Value.ToLocalTime();
                int days = conclusionTime.Value;

                List<DTOs.Holiday> allHolidays = new Holiday().GetAll();
                bool includedAllDays = true;
                while (includedAllDays)
                {
                    if (date.DayOfWeek == DayOfWeek.Saturday)
                    {
                        date = date.AddDays(1);
                    }
                    else if (date.DayOfWeek == DayOfWeek.Friday)
                    {
                        date = date.AddDays(2);
                    }
                    date = date.AddDays(1);
                    DTOs.Holiday holiday = allHolidays.Find(holidayDate => holidayDate.Day == date.Day && holidayDate.Month == date.Month && holidayDate.Year == date.Year);
                    if (holiday != null)
                        continue;
                    days--;
                    if (days == 0)
                        includedAllDays = false;
                }
                return date.ToUniversalTime();
            }
            return null;
        }

        public int Insert(Models.Sample sample)
        {
            if (sample.SampleClassId == null)
                sample.SampleClassId = 1;

            sample.EditionDateTime = DateTime.UtcNow;
            sample.Conclusion = calculateConclusionDate(sample.ReceiveDate, sample.ConclusionTime);

            DataContext.Samples.Add(sample);
            DataContext.SaveChanges();

            return sample.Id;
        }

        public void Update(int sampleId, Models.Sample sampleUpdate)
        {
            if (sampleUpdate.Id != sampleId)
                throw new Exception("Incompatible Data!");

            Models.Sample sample = DataContext.Samples
                .Where(x => x.Id == sampleId)
                .FirstOrDefault();

            sample.Identification = sampleUpdate.Identification;
            sample.EditionDateTime = DateTime.UtcNow;
            sample.Conclusion = calculateConclusionDate(sample.ReceiveDate, sample.ConclusionTime);

            DataContext.MarkAsModified(sample);
            DataContext.SaveChanges();
        }

        public void Delete(int sampleId)
        {
            Models.Sample sample = DataContext.Samples
                .Where(x => x.Id == sampleId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(sample);
            DataContext.SaveChanges();
        }

        #endregion

        #region Infos

        public List<Models.SampleInfo> GetInfos(int sampleId)
        {
            return DataContext.SampleInfos
                .Where(x => x.SampleId == sampleId)
                .ToList();
        }

        public Models.SampleInfo GetInfoById(int sampleId, int sampleInfoId)
        {
            return DataContext.SampleInfos
                .Where(x => 
                    x.Id == sampleInfoId &&
                    x.SampleId == sampleId)
                .FirstOrDefault();
        }

        public int InsertInfo(int sampleId, Models.SampleInfo sampleInfo)
        {
            sampleInfo.SampleId = sampleId;
            sampleInfo.EditionDateTime = DateTime.UtcNow;

            DataContext.SampleInfos.Add(sampleInfo);
            DataContext.SaveChanges();

            return sampleInfo.Id;
        }

        public void UpdateInfo(int sampleId, int sampleInfoId, Models.SampleInfo sampleInfo)
        {
            if (sampleInfo.Id != sampleInfoId)
                throw new Exception("Incompatible Data!");

            sampleInfo.EditionDateTime = DateTime.UtcNow;

            DataContext.MarkAsModified(sampleInfo);
            DataContext.SaveChanges();
        }

        public void DeleteInfo(int sampleId, int sampleInfoId)
        {
            Models.SampleInfo sampleInfo = DataContext.SampleInfos
                .Where(x => 
                    x.Id == sampleInfoId &&
                    x.SampleId == sampleId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(sampleInfo);
            DataContext.SaveChanges();
        }

        #endregion
    }
}