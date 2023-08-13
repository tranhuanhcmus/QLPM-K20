using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;

namespace SunriseServer.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        readonly StripeSettings _stripeSettings;

        public string SessionId { get; set; }

        public PaymentController(IOptions<StripeSettings> stripeSettings)
        {
            _stripeSettings = stripeSettings.Value;
        }

        [HttpPost, Authorize(Roles = GlobalConstant.User)]
        public ActionResult<string> CreateCheckoutSession(string totalPay)
        {
            var currency = "vnd";
            var successUrl = "https://www.facebook.com/";
            var cancelUrl = "https://www.youtube.com/watch?v=ae0bIHuJ1PE";

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
                                Name = "Thanh toán hóa đơn sản phẩm",
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

                var service = new SessionService();
                var session = service.Create(options);
                SessionId = session.Id;

                // url to stripe payment page
                return Ok(session.Url);
            } catch
            {
                return BadRequest(new ResponseMessageDetails<string>("Not enough money to pay your invoice, unable to proceed!"));
            }
        }
    }
}
