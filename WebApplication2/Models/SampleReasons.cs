using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class SampleReason : IIdentityControl, IEditionControl
    {
        [Key]
        public int Id { get; set; }
        public string Identification { get; set; }
        public DateTime? EditionDateTime { get; set; }
    }
}