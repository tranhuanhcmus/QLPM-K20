namespace SunriseServerCore.Models
{
    public class Review
    {
        public int AccountId { get; set; }
        public int HotelId { get; set; }
        public double Points { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
