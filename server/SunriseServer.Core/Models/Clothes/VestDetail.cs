using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class VestDetail: ModelBase
    {
        public VestComponent Component { get; set; }

        public Product Products { get; set; }

        public VestDetail() {
        }
        
        public VestDetail(Product p) {
            Products = p;
        }

        public VestDetail(VestComponent component){
            Component = component;
        }
    }
}
