using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Dtos.Cart
{
    public class GetCartDto
    {
        public int NumberOfProduct { get; set; }
        public int ProductID { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; }
        public string Color { get; set; }
        public string Type { get; set; }
    }
}
