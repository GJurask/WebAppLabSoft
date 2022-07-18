using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class Sample : IIdentityControl, IEditionControl
    {
        [Key]
        public int Id { get; set; }
        public string Identification { get; set; }
        public DateTime? EditionDateTime { get; set; }
        public DateTime? ReceiveDate { get; set; }
        public int? ConclusionTime { get; set; }
        public DateTime? Conclusion { get; set; }
        public string TimeZoneId { get; set; }

        public int? SampleClassId { get; set; }
        [ForeignKey("SampleClassId")]
        public SampleClass SampleClass { get; set; }

        public int? SampleConclusionId{ get; set; }
        [ForeignKey("SampleConclusionId")]
        public SampleConclusion SampleConclusion { get; set; }

        public int? ServiceCenterId { get; set; }
        [ForeignKey("ServiceCenterId")]
        public ServiceCenter ServiceCenter { get; set; }

        public virtual List<SampleInfo> Infos { get; set; }
    }

    public class SampleInfo : IEditionControl
    {
        [Key]
        public int Id { get; set; }
        public string Identification { get; set; }
        public string Value { get; set; }
        public DateTime? EditionDateTime { get; set; }

        public int SampleId { get; set; }
        [ForeignKey("SampleId")]
        public virtual Sample Sample { get; set; }
    }
}