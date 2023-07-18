﻿namespace SunriseServerCore.Models
{
    public class Hotel : ModelBase
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string HotelType { get; set; } = string.Empty;
        public string ProvinceCity { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public int Stars { get; set; }
        public double Rating { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
