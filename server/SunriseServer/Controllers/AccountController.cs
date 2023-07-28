using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.AccountService;
using System.Data;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    // inheritance from abtract class
    public class AccountController : ControllerBase
    {
        // init interface for this class
        readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet("current-account"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<Account>> GetCurrentAccount()
        {
            var result = await _accountService.GetByUsername(User.Identity.Name);
            if (result is null)
                return NotFound("Account not found");

            return Ok(result);
        }

        [HttpGet("{username}"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<Account>> GetAccountByUsername(string username)
        {
            var result =  await _accountService.GetByUsername(username);
            if (result is null)
                return NotFound("Account not found");

            return Ok(result);
        }

        [HttpPut("{id}"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<List<Account>>> UpdateAccount(int id, Account request)
        {
            if (id != request.Id)
            {
                return BadRequest("account id and request id don't match");
            }
            var result = await _accountService.UpdateAccount(request);
            if (result is null)
                return NotFound("Account not found.");

            return Ok(result);
        }
    }
}
