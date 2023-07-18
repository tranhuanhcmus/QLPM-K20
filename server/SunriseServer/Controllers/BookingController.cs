using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Common.Enum;
using SunriseServerCore.Models;
using SunriseServer.Services.BookingService;
using CoreApiResponse;
using SunriseServer.Dtos;
using SunriseServerCore.Common.Enum;
using SunriseServer.Services.AccountService;
using Microsoft.AspNetCore.Http.HttpResults;
using SunriseServer.Common.DataClass;
using SunriseServer.Common.Helper;
using SunriseServer.Dtos.Booking;
using SunriseServer.Services.HotelService;

namespace SunriseServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        readonly IBookingService _bookingService;
        readonly IAccountService _accountService;
        readonly IHotelService _hotelService;

        public BookingController(IBookingService bookingService, IAccountService accountService, IHotelService hotelService)
        {
            _bookingService = bookingService;
            _accountService = accountService;
            _hotelService = hotelService;
        }

        [HttpGet("GetBookingsCurrentAccount")]
        public async Task<ActionResult<ResponseMessageDetails<List<BookingAccount>>>> GetAllBookings()
        {
            var result = await _bookingService.GetAllBookings();
            var finalResult = new List<BookingDto>();
            foreach (var item in result)
            {
                var account = await _accountService.GetById(item.AccountId);
                var hotel = await _hotelService.GetSingleHotel(item.HotelId);

                BookingDto variable = new BookingDto { };

                SetPropValueByReflection.AddYToX(variable, item);

                variable.Account = account;
                variable.Hotel = hotel;

                finalResult.Add(variable);
            }

            return Ok(new ResponseMessageDetails<List<BookingDto>>("Get bookings successfully", finalResult));
        }

        // chua hoan thien lam
        [HttpPost, Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<List<BookingAccount>>>> AddBooking(BookingAccount booking)
        {
            var result = await _bookingService.AddBooking(booking);

            if (result == null)
                return BadRequest("Cannot add booking.");

            return Ok(new ResponseMessageDetails<BookingAccount>("Add booking successfully", result));
        }

        // chua hoan thien lam
        [HttpPut("{id}"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<BookingAccount>>> UpdateBooking(int id, BookingAccount request)
        {
            var result = await _bookingService.UpdateBooking(id, request);
            if (result is null)
                return NotFound("Booking not found.");

            return Ok(new ResponseMessageDetails<BookingAccount>("Update booking successfully", result));
        }

        // chua hoan thien lam
        [HttpDelete("{id}"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<BookingAccount>>> DeleteBooking(int id)
        {
            var result = await _bookingService.DeleteBooking(id);
            if (result is null)
                return NotFound("Booking not found.");

            return Ok(new ResponseMessageDetails<BookingAccount>("Delete booking successfully", result));
        }
    }
}
