using System;
using System.Collections.Generic;
using System.Linq;

namespace SunriseServer.Common.Helper
{
    public class SetPropValueByReflection
    {
        public static void AddYToX(object x, object y)
        {
            Type typeX = x.GetType();
            Type typeY = y.GetType();

            var propName = from prop in typeY.GetProperties() select prop.Name;
            
            propName.ToList().ForEach(p => {
                var propValue = typeY.GetProperty(p).GetValue(y, null);
                typeX.GetProperty(p).SetValue(x, propValue, null);
            });
        }
    }
}
