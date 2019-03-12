

namespace FLComercial.Web.Data
{
    using FLComercial.Web.Data.Entities;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    public class DataContext : IdentityDbContext<User>
    {
        //cada tabla es un tabla en la base de datos
        public DbSet<Product> Products { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
    }
}
