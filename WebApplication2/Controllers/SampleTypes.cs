using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    [RoutePrefix("api/SampleTypes")]
    public class SampleTypesController : ApiController
    {
        Business.SampleType Business;

        public SampleTypesController()
        {
            Business = new Business.SampleType();
        }

        #region SampleTypes

        [HttpGet]
        public List<Models.SampleType> Get()
        {
            return Business.GetAll();
        }

        [HttpGet]
        [Route("{sampleTypeId:int}")]
        public Models.SampleType Get([FromUri]int sampleTypeId)
        {
            return Business.GetById(sampleTypeId);
        }

        [HttpPost]
        public int Post([FromBody]Models.SampleType sampleType)
        {
            return Business.Insert(sampleType);
        }

        [HttpPut]
        [Route("{sampleTypeId:int}")]
        public void Put([FromUri]int sampleTypeId, [FromBody]Models.SampleType sampleType)
        {
            Business.Update(sampleTypeId, sampleType);
        }

        [HttpDelete]
        [Route("{sampleTypeId:int}")]
        public void Delete([FromUri]int sampleTypeId)
        {
            Business.Delete(sampleTypeId);
        }

        #endregion
    }
}