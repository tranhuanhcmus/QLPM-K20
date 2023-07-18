using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class Jacket
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public int Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; }
        public int Style { get; set; }
        public int Fit { get; set; }
        public int Lapel { get; set; }
        public int SleeveButton { get; set; }
        public int BackStyle { get; set; }
        public int BreastPocket { get; set; }
        public int Pocket { get; set; }
    }
}
