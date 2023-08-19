using SunriseServerCore.Models;

namespace SunriseServerCore.Dtos.Order
{
    public class GetOrderDto
    {
        public int OrderId  { get; set; }
        public int AccountId { get; set; }
        public string Address { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime? TimeDone { get; set; }
        public string Status { get; set; }
        public double TotalPrice { get; set; }
        public string PaymentMethod { get; set; }
        public List<OrderDetail> OrderItem { get; set; }
    }

    public class OrderDetailDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UserUpdateOrderDto
    {
        public int OrderId  { get; set; }
        public string Address { get; set; }
        public string PaymentMethod { get; set; }
        public List<OrderDetailDto> OrderItem { get; set; }
    }

    public class AdminUpdateOrderDto
    {
        public int OrderId  { get; set; }
        public DateTime? TimeDone { get; set; }
        public string Status { get; set; }
        public double TotalPrice { get; set; }
    }

    public class AddOrderDto
    {
        public string Address { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime? TimeDone { get; set; }
        public string Status { get; set; }
        public double TotalPrice { get; set; }
        public string PaymentMethod { get; set; }
        public List<OrderDetailDto> OrderItem { get; set; }
    }
}
