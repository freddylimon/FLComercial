using FLComercial.Web.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FLComercial.Web.Data
{
    public class SeedDB
    {
        private readonly DataContext context;
        private Random random;
        public SeedDB(DataContext context)
        {
            this.context = context;
            this.random = new Random();
        }
        public async Task SeedAsinc()
        {
            await this.context.Database.EnsureCreatedAsync();
            if (!this.context.Products.Any())
            {
                this.AddProduct("Panel vista 21");
                this.AddProduct("Sensor de movimiento");
                this.AddProduct("Camara hikvision");
                await this.context.SaveChangesAsync();
            }
        }
        private void AddProduct(string name)
        {
            this.context.Products.Add(new Product
            {
                Name = name,
                Price = this.random.Next(100),
                IsAvailabe = true,
                Stock = this.random.Next(100)
            });
        }
    }
}
