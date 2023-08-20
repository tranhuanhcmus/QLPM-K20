using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.AccountService;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/account")]

    // inheritance from abtract class
    public class AccountController : ControllerBase
    {
        private readonly HttpContextAccessor _httpContext;

        // init interface for this class
        readonly IAccountService _accountService;
        private readonly UnitOfWork _uow;
        public AccountController(IAccountService accountService, UnitOfWork uow, HttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
            _accountService = accountService;
            _uow = uow;
        }

        [HttpGet("current-account"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<Account>> GetCurrentAccount()
        {
            var result = await _accountService.GetByUsername(User.Identity.Name);
            if (result is null)
                return NotFound("Account not found");

            return Ok(result);
        }

        [HttpGet("username"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<Account>> GetAccountByUsername(string username)
        {
            var result =  await _accountService.GetByUsername(username);
            if (result is null)
                return NotFound("Account not found");

            return Ok(result);
        }

        [HttpPut(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<List<Account>>> UpdateAccount(Account request)
        {
            var result = await _accountService.UpdateAccount(request);
            if (result is null)
                return NotFound("Account not found.");

            return Ok(result);
        }

        [HttpPut("measurement"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<int>> UpdateMeasurement(
            [FromQuery] Account request
        )
        {
            var result = await _accountService.UpdateAccount(request);
            if (result is null)
                return NotFound("Account not found.");

            return Ok(result);
        }
    }
}
