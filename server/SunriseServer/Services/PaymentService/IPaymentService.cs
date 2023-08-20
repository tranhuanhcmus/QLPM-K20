using SunriseServerCore.Dtos.Payment;

namespace SunriseServer.Services.PaymentService
{
    public interface IPaymentService
    {
        PaymentDto Checkout(string totalPay);
    }
};

