using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    [RoutePrefix("api/ServiceCenters")]
    public class ServiceCentersController : ApiController
    {
        Business.ServiceCenter Business;

        public ServiceCentersController()
        {
            Business = new Business.ServiceCenter();
        }

        #region ServiceCenters

        [HttpGet]
        public List<Models.ServiceCenter> Get()
        {
            return Business.GetAll();
        }

        [HttpGet]
        [Route("{serviceCenterId:int}")]
        public Models.ServiceCenter Get([FromUri]int serviceCenterId)
        {
            return Business.GetById(serviceCenterId);
        }

        [HttpPost]
        public int Post([FromBody]Models.ServiceCenter serviceCenter)
        {
            return Business.Insert(serviceCenter);
        }

        [HttpPut]
        [Route("{serviceCenterId:int}")]
        public void Put([FromUri]int serviceCenterId, [FromBody]Models.ServiceCenter serviceCenter)
        {
            Business.Update(serviceCenterId, serviceCenter);
        }

        [HttpDelete]
        [Route("{serviceCenterId:int}")]
        public void Delete([FromUri]int serviceCenterId)
        {
            Business.Delete(serviceCenterId);
        }

        #endregion
    }
}