using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    [RoutePrefix("api/Configs")]
    public class ConfigsController : ApiController
    {
        Business.Config Business;

        public ConfigsController()
        {
            Business = new Business.Config();
        }

        #region Configs

        [HttpGet]
        public string Get()
        {
            return Business.Execute();
        }

        #endregion
    }
}