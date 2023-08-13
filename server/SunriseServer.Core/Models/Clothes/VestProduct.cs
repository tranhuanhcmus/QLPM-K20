using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class VestProduct: ModelBase
    {
        public Vest VestData { get; set; }
        public Product ProductData { get; set; }
    }
}
