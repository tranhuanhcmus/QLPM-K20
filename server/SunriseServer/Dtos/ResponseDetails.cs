using Newtonsoft.Json;
using SunriseServerCore.Common.Enum;

namespace SunriseServer.Dtos
{
    public class ResponseDetails
    {
        public ResponseDetails(ResponseStatusCode statusCode, string message) {
            StatusCode = statusCode;
            Message = message;
        }

        public ResponseStatusCode StatusCode { get; protected set; } = ResponseStatusCode.Ok;
        public string Message { get; protected set; }
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
