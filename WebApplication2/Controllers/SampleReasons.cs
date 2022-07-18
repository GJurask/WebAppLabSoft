using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    [RoutePrefix("api/SampleReasons")]
    public class SampleReasonsController : ApiController
    {
        Business.SampleReason Business;

        public SampleReasonsController()
        {
            Business = new Business.SampleReason();
        }

        #region SampleReasons

        [HttpGet]
        public List<Models.SampleReason> Get()
        {
            return Business.GetAll();
        }

        [HttpGet]
        [Route("{sampleReasonId:int}")]
        public Models.SampleReason Get([FromUri]int sampleReasonId)
        {
            return Business.GetById(sampleReasonId);
        }

        [HttpPost]
        public int Post([FromBody]Models.SampleReason sampleReason)
        {
            return Business.Insert(sampleReason);
        }

        [HttpPut]
        [Route("{sampleReasonId:int}")]
        public void Put([FromUri]int sampleReasonId, [FromBody]Models.SampleReason sampleReason)
        {
            Business.Update(sampleReasonId, sampleReason);
        }

        [HttpDelete]
        [Route("{sampleReasonId:int}")]
        public void Delete([FromUri]int sampleReasonId)
        {
            Business.Delete(sampleReasonId);
        }

        #endregion
    }
}