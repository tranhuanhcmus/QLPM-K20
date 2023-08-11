using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class PantsProduct: ModelBase
    {
        public Pants PantsData { get; set; }
        public Product ProductData { get; set; }
    }
}
