using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServerCore.Dtos;
using SunriseServer.Services.FabricService;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos.Fabric;
using System.Security.Claims;

namespace SunriseServer.Controllers
{

    [ApiController]
    [Route("api/fabric")]
    public class FabricController : ControllerBase
    {

        private readonly IHttpContextAccessor _httpContext;
        private readonly IFabricService _fabricService;

        public FabricController(IHttpContextAccessor httpContext, IFabricService fabricService)
        {
            _httpContext = httpContext;
            _fabricService = fabricService;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<GetFabricDto>>> GetFabricById()
        {
            var id = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
            if (id == 0)
            {
                return NotFound("Cannot find user, please login again!");
            }

            try {
                var result = await _fabricService.GetFabricById(id);

                if (result == null) {
                    return NotFound("Fabric not found");
                }

                return Ok(result);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("all")] // check
        public async Task<IActionResult> GetFabrics()
        {
            try {
                var result = await _fabricService.GetFabrics();

                if (result == null) {
                    return NotFound("Cannot get fabrics");
                }

                return Ok(new ResponseMessageDetails<List<Fabric>>("Fabrics retrieved successfully", result));
            }
            catch (Exception) {
                return BadRequest("Cannot get fabrics");
            }
        }

        [HttpPost(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> AddFabric(AddFabricDto fabricDto)
        {
            try {
                var result = await _fabricService.AddFabric(fabricDto);

                if (result == 0) {
                    return NotFound("Cannot add fabric");
                }

                return Ok(new ResponseMessageDetails<int>("Fabric created successfully", result));
            }
            catch (Exception e) {
                return BadRequest($"Cannot create fabric: {e.Message}");
            }
        }

        [HttpPut(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<IActionResult> UpdateFabric(UpdateFabricDto fabricDto)
        {
            try {
                var result = await _fabricService.UpdateFabric(fabricDto);

                if (result == 0) {
                    return NotFound("Cannot update fabric");
                }

                return Ok(new ResponseMessageDetails<int>("Fabric updated successfully", result));
            }
            catch (Exception e) {
                return BadRequest($"Cannot update fabric: {e.Message}");
            }
        }

        [HttpDelete(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> DeleteFabric(int fabricId)
        {
            try {
                var result = await _fabricService.DeleteFabric(fabricId);

                if (result == 0)
                {
                    return BadRequest("Delete fabric failed");
                }

                return Ok(new ResponseMessageDetails<int>("Delete fabric successfully", 1));
            }
            catch (Exception e) {
                return BadRequest($"Cannot delete fabric: {e.Message}");
            }
        }
    }
}