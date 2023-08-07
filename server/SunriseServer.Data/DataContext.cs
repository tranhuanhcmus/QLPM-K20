global using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using SunriseServerCore.Models;
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
            modelBuilder.Entity<Account>()
                .HasKey(x => new { x.AccountId });
            modelBuilder.Entity<BookingAccount>()
                .HasKey(x => new { x.AccountId, x.HotelId, x.RoomTypeId, x.CheckIn });
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<BookingAccount> Booking_Account { get; set; }
    }
}
