using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FLComercial.Web.Data.Entities
{
    public class Country : IEntity
    {
        public int Id { get ; set ; }

        [Display(Name="Pais")]
        [Required]
        public string Name { get; set; }
    }
}
