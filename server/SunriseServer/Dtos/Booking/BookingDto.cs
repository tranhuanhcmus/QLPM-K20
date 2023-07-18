namespace SunriseServer.Dtos.Booking
{
    public class BookingDto
    {
        public int AccountId { get; set; }
        public int HotelId { get; set; }
        public int RoomTypeId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int NumberOfRoom { get; set; } = 1;
        public Account Account { get; set; }
        public Hotel Hotel { get; set; }
        public RoomType RoomType { get; set; }
    }
}
