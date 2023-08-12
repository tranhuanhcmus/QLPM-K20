using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Common.Enum
{
    public enum ResponseStatusCode
    {
        Ok = 200,
        Created = 201,
        NoContent = 204,
        BadRequest = 500,
        Unauthorized = 401,
        Forbidden = 403,
        InternalServerError = 500
    }
}
