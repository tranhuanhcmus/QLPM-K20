using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.PantsService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;
using SunriseServer.Common.Constant;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PantsController : ControllerBase
    {
        readonly IPantsService _pantsService;
        private readonly ILogger<PantsController> _logger;

        public PantsController(IPantsService PantsService, ILogger<PantsController> logger)
        {
            _pantsService = PantsService;
            _logger = logger;
        }


        [HttpGet("All-Pants")]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var result = await _pantsService.GetAll();
            if (result is null)
            {
                return NotFound("No Pantss found");
            }

            return Ok(result);
        }
        // get by name
        // [HttpGet("{name}")]
        // public ActionResult<PantsProduct> GetPantsByNameOrDescription(string name)
        // {
        //     var result = _pantsService.GetPantsByName(name);
        //     if (result is null)
        //         return NotFound("Pants not found");

        //     return Ok(result);
        // }
        // get detail by nid

        [HttpDelete("/Pants/{pantsId}")]
        public async Task<ActionResult<bool>> DeletePants(int pantsId)
        {
            bool result = await _pantsService.DeletePants(pantsId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

        }

        [HttpGet("{id}")]
        public ActionResult<PantsDetail> GetPantsById(int id)
        {
            var result = _pantsService.GetPantsDetailById(id);
            if (result is null)
                return NotFound("Pants not found");

            return Ok(result);
        }

        [HttpGet("/Pants/GetImageCustom")]
        public async Task<ActionResult<ImageDto>> GetPantsImageByCustom(string fabric,[FromQuery] PantsComponent pants)
        {
            var result = await _pantsService.GetImageByCustom(fabric, pants);
            if (result is null)
                return NotFound("Image not found");

            return Ok(result);
        }



        [HttpPut("UpdatePants")]
        public async Task<ActionResult<bool>> UpdatePants(PantsDetail pantsToUpdate) {

            pantsToUpdate.Products.Type = GlobalConstant.PantsProduct;
            bool result = await _pantsService.UpdatePants(pantsToUpdate.Products,pantsToUpdate.Component);
           
            if (!result)
                return NotFound("Can not Update, please try again");

            return Ok("Update Successfully");
        }

        // get by id
        // get by category ??
        // insert one - just for admin
        [HttpPost("Add-Pants")]

        public async Task<ActionResult<bool>> AddPants(AddPants ap)
        {
            bool result = await _pantsService.AddPants(ap);
            if (!result)
                return NotFound("Cannot insert pants, please try again");

            return Ok("Add Successfully");
        }


    }
}
