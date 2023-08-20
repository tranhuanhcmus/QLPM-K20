global using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Dtos;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos.Product;

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

            modelBuilder.Entity<GetRawCartDto>()
                .HasNoKey().ToTable("GetRawCartDto", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<ImageDto>()
                .HasNoKey().ToTable("ImageDto", t => t.ExcludeFromMigrations());


            modelBuilder.Entity<JacketComponent>()
                .HasNoKey().ToTable("JacketComponent", t => t.ExcludeFromMigrations());
            
            modelBuilder.Entity<VestComponent>()
                .HasNoKey().ToTable("VestComponent", t => t.ExcludeFromMigrations());
            
            modelBuilder.Entity<PantsComponent>()
                .HasNoKey().ToTable("PantsComponent", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<TiesComponent>()
                .HasNoKey().ToTable("TiesComponent", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<ProductDto>()
                .HasKey(x => new { x.Id });
                //.ToTable("ProductDto", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<OrderDetail>()
                .HasNoKey().ToTable("OrderDetail", t => t.ExcludeFromMigrations());

            modelBuilder.Entity<Order>()
                .HasKey(x => new { x.OrderId });

            modelBuilder.Entity<Fabric>()
                .HasKey(x => new { x.FabricID });
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
        public DbSet<Fabric> Farbic { get; set; }
    }
}
