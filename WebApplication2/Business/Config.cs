using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace WebApplication2.Business
{
    public class Config
    {
        public string Execute()
        {
            return String.Format("{0} {1}",
                    "Resultado obtido",
                    Utils.Info.FormatNumbersInString(
                        "0,1",
                        new CultureInfo("pt-BR"),
                        new CultureInfo("en-US"),
                        3,
                        null,
                        float.Parse("0.001", new CultureInfo("en-US")),
                        false,
                        false)
                    );
        }
    }
}