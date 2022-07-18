using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;

namespace WebApplication2
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpConfiguration config = GlobalConfiguration.Configuration;
            try
            {
                config.Formatters.JsonFormatter.SupportedMediaTypes.Add(
                    new System.Net.Http.Headers.MediaTypeHeaderValue("text/html")
                );
            }
            catch (IndexOutOfRangeException ex)
            {
                System.Diagnostics.Debug.Print(ex.Message);
            }
            catch (Exception)
            {
                throw;
            }

            var json = config.Formatters.JsonFormatter;

            json.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
            json.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;

            json.SerializerSettings.ObjectCreationHandling = Newtonsoft.Json.ObjectCreationHandling.Replace;
            json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");
            System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en-US");
        }
    }
}
