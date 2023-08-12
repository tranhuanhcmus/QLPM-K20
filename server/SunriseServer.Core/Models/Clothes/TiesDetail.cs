using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class TiesDetail: ModelBase
    {
        public int TiesID { get; set; }
        public string Style { get; set; }
        public decimal Size { get; set; }
        public Product Products { get; set; }

    }
}
