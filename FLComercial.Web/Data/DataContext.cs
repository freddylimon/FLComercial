using FLComercial.Web.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FLComercial.Web.Data
{
    public class DataContext: DbContext
    {
        //cada tabla es un tabla en la base de datos
        public DbSet<Product> Products { get; set; }
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }  
    }
}
