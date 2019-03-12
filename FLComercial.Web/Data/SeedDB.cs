

namespace FLComercial.Web.Data
{
    using FLComercial.Web.Data.Entities;
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    public class SeedDB
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;
        private Random random;
        public SeedDB(DataContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
            this.random = new Random();
        }
        public async Task SeedAsinc()
        {
            await this.context.Database.EnsureCreatedAsync();

            //creamos el usuario la primera vez
            var user = await this.userManager.FindByEmailAsync("freddy-limon@hotmail.com");
            if(user == null)
            {
                user = new User
                {
                    FirstName="Freddy",
                    LastName="Limon",
                    Email= "freddy-limon@hotmail.com",
                    UserName= "freddy-limon@hotmail.com",
                   PhoneNumber="78569226"
                };

                var result = await this.userManager.CreateAsync(user, "123456");
                if(result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("No se pudo crear el Usuario");
                }
            }
            if (!this.context.Products.Any())
            {
                this.AddProduct("Panel vista 21", user);
                this.AddProduct("Sensor de movimiento", user);
                this.AddProduct("Camara hikvision", user);
                await this.context.SaveChangesAsync();
            }
        }
        private void AddProduct(string name, User user)
        {
            this.context.Products.Add(new Product
            {
                Name = name,
                Price = this.random.Next(100),
                IsAvailabe = true,
                Stock = this.random.Next(100),
                User= user
            });
        }
    }
}
