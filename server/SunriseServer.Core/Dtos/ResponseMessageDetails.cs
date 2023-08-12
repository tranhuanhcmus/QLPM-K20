using SunriseServerCore.Common.Enum;

namespace SunriseServerCore.Dtos
{
    public class ResponseMessageDetails<TData> : ResponseDetails
    {
        public ResponseMessageDetails(string message, ResponseStatusCode statusCode = ResponseStatusCode.Ok) : base(statusCode, message)
        {
            Data = default;
        }

        public ResponseMessageDetails(string message, TData data, ResponseStatusCode statusCode = ResponseStatusCode.Ok) : base(statusCode, message)
        {
            Data = data;
        }

        public TData Data { get; set; }
    }
}
