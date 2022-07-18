using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.DTOs
{
    public class Holiday
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public string Identification { get; set; }
    }
}