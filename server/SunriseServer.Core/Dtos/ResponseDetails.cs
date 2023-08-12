using SunriseServerCore.Common.Enum;

namespace SunriseServerCore.Dtos
{
    public class ResponseDetails
    {
        public ResponseDetails(ResponseStatusCode statusCode, string message) {
            StatusCode = statusCode;
            Message = message;
        }

        public ResponseStatusCode StatusCode { get; protected set; } = ResponseStatusCode.Ok;
        public string Message { get; protected set; }
    }
}
