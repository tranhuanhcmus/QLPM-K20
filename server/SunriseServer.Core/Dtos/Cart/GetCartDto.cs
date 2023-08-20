using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SunriseServerCore.Dtos.Product;


namespace SunriseServerCore.Dtos.Cart
{
    public class GetCartDto
    {
        public ProductDto Item { get; set; }
        public int Quantity { get; set; }
    }

    public class GetRawCartDto
    {
        public int Quantity { get; set; }
        public int Id { get; set; }
    }
}
