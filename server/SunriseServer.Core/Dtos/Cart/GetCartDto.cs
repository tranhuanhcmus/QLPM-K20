﻿using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Dtos.Cart
{
    public class GetCartDto
    {
        public int Quantity { get; set; }
        public ProductDto Item { get; set; }
    }

    public class GetRawCartDto
    {
        public int Quantity { get; set; }
        public int Id { get; set; }
        public double Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}
