using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class ServiceCenter
    {
        Context DataContext;

        public ServiceCenter()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region ServiceCenters

        public List<Models.ServiceCenter> GetAll()
        {
            return DataContext.ServiceCenters
                .ToList();
        }

        public Models.ServiceCenter GetById(int serviceCenterId)
        {
            return DataContext.ServiceCenters
                .Where(x => x.Id == serviceCenterId)
                .FirstOrDefault();
        }

        public int Insert(Models.ServiceCenter serviceCenter)
        {
            serviceCenter.EditionDateTime = DateTime.UtcNow;

            DataContext.ServiceCenters.Add(serviceCenter);
            DataContext.SaveChanges();

            return serviceCenter.Id;
        }

        public void Update(int serviceCenterId, Models.ServiceCenter serviceCenterUpdate)
        {
            if (serviceCenterUpdate.Id != serviceCenterId)
                throw new Exception("Incompatible Data!");

            Models.ServiceCenter serviceCenter = DataContext.ServiceCenters
                .Where(x => x.Id == serviceCenterId)
                .FirstOrDefault();

            serviceCenter.Identification = serviceCenterUpdate.Identification;
            serviceCenter.EditionDateTime = DateTime.UtcNow;

            DataContext.MarkAsModified(serviceCenter);
            DataContext.SaveChanges();
        }

        public void Delete(int serviceCenterId)
        {
            Models.ServiceCenter serviceCenter = DataContext.ServiceCenters
                .Where(x => x.Id == serviceCenterId)
                .FirstOrDefault();

            DataContext.MarkAsDeleted(serviceCenter);
            DataContext.SaveChanges();
        }

        #endregion
    }
}