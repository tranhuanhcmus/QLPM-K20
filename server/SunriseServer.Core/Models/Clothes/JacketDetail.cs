using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class JacketDetail: ModelBase
    {
        public JacketComponent Component { get; set; }

        public Product Products { get; set; }

        public JacketDetail() {
        }
        
        public JacketDetail(Product p) {
            Products = p;
        }

        public JacketDetail(JacketComponent component){
            Component = component;
        }
    }
}
