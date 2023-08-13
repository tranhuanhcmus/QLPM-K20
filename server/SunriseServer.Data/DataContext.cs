global using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos.Order;
//using Microsoft.Data.SqlClient;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;

namespace SunriseServerData
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BookingAccount>()
                .HasKey(x => new { x.AccountId, x.HotelId, x.RoomTypeId, x.CheckIn });

            modelBuilder.Entity<MyProcedureResult>()
                .HasNoKey().ToTable("MyProcedureResult", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<GetCartDto>()
                .HasNoKey().ToTable("GetOrdersDto", t => t.ExcludeFromMigrations());
            
            modelBuilder.Entity<GetOrderDto>()
                .HasNoKey().ToTable("GetOrderDto", t => t.ExcludeFromMigrations());
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<Jacket> Jacket { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Vest> Vest { get; set; }
        public DbSet<Ties> Ties { get; set; }
        public DbSet<Pants> Pants { get; set; }
        public DbSet<BookingAccount> Booking_Account { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Order> Order { get; set; }
    }
}
