using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class VestDetail: ModelBase
    {
        public int VestId { get; set; }
        public string Style { get; set; }
        public string Type { get; set; }
        public string Lapel { get; set; }
        public string Edge { get; set; }
        public string BreastPocket { get; set; }
        public string FrontPocket { get; set; }

        public Product Products { get; set; }
    }
}
