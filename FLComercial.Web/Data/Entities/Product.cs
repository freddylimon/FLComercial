using System;
using System.ComponentModel.DataAnnotations;

namespace FLComercial.Web.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }

        [Display(Name = "Imagen")]
        [MaxLength(100, ErrorMessage ="el campo {0} no debe ser mayor a {1} caracteres")]
        [Required]
        public string Name { get; set; }

        [DisplayFormat(DataFormatString = "{0:C2}", ApplyFormatInEditMode = false)]
        public decimal Price { get; set; }

        [Display(Name = "Imagen")]
        public string ImageUrl { get; set; }

        [Display(Name = "Ultima compra")]
        public DateTime? LastPurchase { get; set; }

        [Display(Name = "Ultima Venta")]
        public DateTime? LastSale { get; set; }

        [Display(Name = "Disponible?")]
        public bool IsAvailabe { get; set; }

        [DisplayFormat(DataFormatString = "{0:N2}", ApplyFormatInEditMode = false)]
        public double Stock { get; set; }

        //realacion con la tabla User de 1 a mucho
        [Required]
        public User User { get; set; }

    }
}
