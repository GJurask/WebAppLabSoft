using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class Holiday
    {
        Context DataContext;

        public Holiday()
        {
            DataContext = new Context();
            DataContext.CreateDatabaseIfNotExists();
        }

        #region Holidays

        public List<DTOs.Holiday> GetAll()
        {
            List<DTOs.Holiday> holidays = new List<DTOs.Holiday>();

            holidays.Add(new DTOs.Holiday() 
            {
                Year = 2017,
                Month = 12,
                Day = 25,
                Identification = "Natal"
            });

            holidays.Add(new DTOs.Holiday()
            {
                Year = 2018,
                Month = 01,
                Day = 01,
                Identification = "Ano Novo"
            });

            return holidays;
        }

        #endregion
    }
}