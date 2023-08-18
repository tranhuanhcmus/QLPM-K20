namespace SunriseServerCore.Models
{
    public class Order : ModelBase
    {
        public int OrderId  { get; set; }
        public int AccountId { get; set; }
        public string Address { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime TimeDone { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalPrice { get; set; }
    }

    // OrderId int primary key, -- INT AUTO_INCREMENT PRIMARY KEY,
    // customer int,
    // Address nvarchar(150), -- character set utf8mb4,
    // TimeOrder datetime,
    // Status varchar(50),
    // TimeDone date,
    // PaymentMethod varchar(100),
    // ToTalPrice double

    // public class OrderDetail : ModelBase
    // {
    //     public int OrderId { get; set; }
    //     public int ProductId { get; set; }
    //     public int Quantity { get; set; }
    //     public double Price { get; set; }
    // }

}