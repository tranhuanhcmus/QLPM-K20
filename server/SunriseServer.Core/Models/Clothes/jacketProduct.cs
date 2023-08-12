using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class JacketProduct: ModelBase
    {
        public Jacket JacketData { get; set; }
        public Product ProductData { get; set; }
    }
}
