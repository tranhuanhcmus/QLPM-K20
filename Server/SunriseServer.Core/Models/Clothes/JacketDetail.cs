﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class JacketDetail: ModelBase
    {
        public int JacketId { get; set; }
        public string Style { get; set; }
        public string Fit { get; set; }
        public string Lapel { get; set; }
        public string SleeveButton { get; set; }
        public string BackStyle { get; set; }
        public string BreastPocket { get; set; }
        public string Pocket { get; set; }

        public Product Products { get; set; }
    }
}