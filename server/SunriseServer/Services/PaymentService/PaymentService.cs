using Stripe.Checkout;
using Stripe;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using Microsoft.Extensions.Options;
using SunriseServerCore.Dtos.Payment;

namespace SunriseServer.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        readonly StripeSettings _stripeSettings;
        // call api to confirm order (update paid column in Account_Order table)
        public const string SUCCESS_URL = "http://sunrise-silk.shop.s3-website-ap-southeast-1.amazonaws.com/?fbclid=IwAR1LrgxBLnA5zjeLphYZcrEtJX5n7EnM1pAOFYXH8rYfgiuTS7FKDa11rzc";
        const string FAIL_URL = "http://sunrise-silk.shop.s3-website-ap-southeast-1.amazonaws.com/?fbclid=IwAR1LrgxBLnA5zjeLphYZcrEtJX5n7EnM1pAOFYXH8rYfgiuTS7FKDa11rzc";
        const string CURRENCY = "usd";
        public string SessionId { get; set; }
        public PaymentService(IOptions<StripeSettings> stripeSettings) {
            _stripeSettings = stripeSettings.Value;
        }

        public PaymentDto Checkout(string totalPay)
        {
            var currency = CURRENCY;
            var successUrl = SUCCESS_URL;
            var cancelUrl = FAIL_URL;

            StripeConfiguration.ApiKey = _stripeSettings.SecretKey;

            try
            {
                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string>
                {
                    "card"
                },
                    LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = currency,
                            UnitAmount = Convert.ToInt64(totalPay),
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "Thanh toán đặt may trang phục",
                                Description = "Thanh toán với thẻ thanh toán quốc tế VISA",
                                Images = new List<string>
                                {
                                    "https://th.bing.com/th/id/R.88fffa3cfd63e9c82824f909437d4286?rik=b8IrXxOpUaP%2f6w&pid=ImgRaw&r=0",
                                    "https://leadtravel.com.vn/cam-nang-du-lich/wp-content/uploads/2018/06/khach-san-5-sao-ha-long-1.jpg",
                                    "https://2trip.vn/wp-content/uploads/2021/04/khach-san-5-sao-tai-vung-tau-1.jpg"
                                }
                            }
                        },
                        Quantity = 1
                    }
                },
                    Mode = "payment",
                    SuccessUrl = successUrl,
                    CancelUrl = cancelUrl
                };

                var result = new PaymentDto();
                var service = new SessionService();
                var session = service.Create(options);
                result.Url = session.Url;
                result.SessionId = session.Id;

                // url to stripe payment page
                return result;
            }
            catch
            {
                return default;
            }
        }
    }
}
