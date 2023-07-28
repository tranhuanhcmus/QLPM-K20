using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class Vest: ModelBase
    {
        public int VestID { get; set; }
        public int Style { get; set; }
        public int Type { get; set; }
    }
}
