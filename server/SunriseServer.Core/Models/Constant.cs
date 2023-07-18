namespace SunriseServerCore.Models
{
    public class HotelRoomFacility : ModelBase
    {
        public int Id { set; get; }
        public string Value { set; get; } = string.Empty;
    }

    public class HotelRoomService : ModelBase
    {
        public int Id { set; get; }
        public string Value { set; get; } = string.Empty;
    }
}