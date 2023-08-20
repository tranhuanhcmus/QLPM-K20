using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.BodyService;
using SunriseServerCore.Dtos.Product;
using SunriseServerCore.Models.Clothes;
using System.Security.Claims;

namespace SunriseServer.Controllers
{

    [Route("api/measure")]
    [ApiController]
    public class BodyController : ControllerBase
    {
        readonly IBodyService _bodyService;
        readonly IHttpContextAccessor _httpContext;

        public BodyController(IBodyService bodyService, IHttpContextAccessor httpContext)
        {
            _bodyService = bodyService;
            _httpContext = httpContext;
        }

        [HttpGet(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<BodyMeasurement>> GetMeasurement()
        {
            try
            {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                var result = await _bodyService.GetAllMesurement(userId);

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest($"Cannot find user, please login again");
            }
        }

        [HttpPost(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<BodyMeasurement>> AddMeasurement(PostBodyMeasureMentDto postData)
        {
            try
            {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                var result = await _bodyService.PostAllMesurement(postData, userId);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest($"Cannot find user, please login again");
            }
        }
    }
}
