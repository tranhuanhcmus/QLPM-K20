namespace SunriseServer.Common.DataClass
{
    public class HotelClientData {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string HotelType { get; set; } = string.Empty;
        public string ProvinceCity { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int Stars { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<string> Facilities { get; set; }
        public List<string> Services { get; set; }
    }
}