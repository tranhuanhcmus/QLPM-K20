namespace SunriseServerCore.Models
{
    public class RoomPicture
    {
        public int HotelId { get; set; }
        public int RoomTypeId { get; set; }
        public int PictureId { get; set; }
        public string PictureLink { get; set; } = string.Empty;
    }
}
