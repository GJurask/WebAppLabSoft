using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    [RoutePrefix("api/Samples")]
    public class SamplesController : ApiController
    {
        Business.Sample Business;

        public SamplesController()
        {
            Business = new Business.Sample();
        }

        #region Samples

        [HttpGet]
        public List<Models.Sample> Get()
        {
            return Business.GetAll();
        }

        [HttpGet]
        [Route("{sampleId:int}")]
        public Models.Sample Get([FromUri]int sampleId)
        {
            return Business.GetById(sampleId);
        }

        [HttpPost]
        public int Post([FromBody]Models.Sample sample)
        {
            return Business.Insert(sample);
        }

        [HttpPut]
        [Route("{sampleId:int}")]
        public void Put([FromUri]int sampleId, [FromBody]Models.Sample sample)
        {
            Business.Update(sampleId, sample);
        }

        [HttpDelete]
        [Route("{sampleId:int}")]
        public void Delete([FromUri]int sampleId)
        {
            Business.Delete(sampleId);
        }

        #endregion

        #region Sample Infos

        [HttpGet]
        [Route("{sampleId:int}/infos")]
        public List<Models.SampleInfo> GetInfos([FromUri]int sampleId)
        {
            return Business.GetInfos(sampleId);
        }

        [HttpGet]
        [Route("{sampleId:int}/infos/{sampleInfoId:int}")]
        public Models.SampleInfo GetInfo([FromUri]int sampleId, [FromUri]int sampleInfoId)
        {
            return Business.GetInfoById(sampleId, sampleInfoId);
        }

        [HttpPost]
        [Route("{sampleId:int}/infos")]
        public int PostInfo([FromUri]int sampleId, [FromBody]Models.SampleInfo sampleInfo)
        {
            return Business.InsertInfo(sampleId, sampleInfo);
        }

        [HttpPut]
        [Route("{sampleId:int}/infos/{sampleInfoId:int}")]
        public void PutInfo([FromUri]int sampleId, [FromUri]int sampleInfoId, [FromBody]Models.SampleInfo sampleInfo)
        {
            Business.UpdateInfo(sampleId, sampleInfoId, sampleInfo);
        }

        [HttpDelete]
        [Route("{sampleId:int}/infos/{sampleInfoId:int}")]
        public void DeleteInfo([FromUri]int sampleId, [FromUri]int sampleInfoId)
        {
            Business.DeleteInfo(sampleId, sampleInfoId);
        }

        #endregion
    }
}