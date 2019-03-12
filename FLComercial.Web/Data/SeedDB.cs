

namespace FLComercial.Web.Data
{
    using Entities;
    using Helpers;
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    public class SeedDB
    {
        private readonly DataContext context;
        private readonly IUserHelper userHelper;
        private readonly Random random;
        public SeedDB(DataContext context, IUserHelper userHelper)
        {
            this.context = context;
            this.userHelper = userHelper;
            this.random = new Random();
        }
        public async Task SeedAsinc()
        {
            await this.context.Database.EnsureCreatedAsync();

            //creamos el usuario la primera vez
            var user = await this.userHelper.GetUserByEmailAsync("freddy-limon@hotmail.com");
            if (user == null)
            {
                user = new User
                {
                    FirstName = "Freddy",
                    LastName = "Limon",
                    Email = "freddy-limon@hotmail.com",
                    UserName = "freddy-limon@hotmail.com",
                    PhoneNumber = "78569226"
                };

                var result = await this.userHelper.AddUserAsync(user, "123456");
                if (result != IdentityResult.Success)
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
                User = user
            });
        }
    }
}
