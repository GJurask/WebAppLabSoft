using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public interface IEditionControl
    {
        DateTime? EditionDateTime { get; set; }
    }

    public interface IIdentityControl
    {
        int Id { get; set; }
    }
}