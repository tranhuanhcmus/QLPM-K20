﻿using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.VestService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;
using SunriseServer.Common.Constant;


namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/vest")]
    public class VestController : ControllerBase
    {
        readonly IVestService _vestService;

        public VestController(IVestService vestService, ILogger<VestController> logger)
        {
            _vestService = vestService;
        }


        [HttpGet("all")]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            var result = await _vestService.GetAll();
            if (result is null)
            {
                return NotFound("No Vest found");
            }

            return Ok(result);
        }

        // get by id
        // get detail by nid
        [HttpGet("")]
        public ActionResult<VestDetail> GetVestById(int id)
        {
            var result = _vestService.GetVestDetailById(id);
            if (result is null)
                return NotFound("Vest not found");

            return Ok(result);
        }

        [HttpGet("get-image-custom")]
        public async Task<ActionResult<ImageDto>> GetVestImageByCustom(string fabric,[FromQuery] VestComponent vest)
        {
            if (string.IsNullOrWhiteSpace(fabric))
                return BadRequest("Please ennter the Fabric ");
            vest.AutoFillEmpty();

            var result = await _vestService.GetImageByCustom(fabric, vest);
            if (result is null)
                return NotFound("Image not found");

            return Ok(result);
        }

        // get by category ??
        // insert one - just for admin
        // [HttpGet("{name}")]
        // public ActionResult<VestProduct> GetVestByNameOrDescription(string name)
        // {
        //     var result = _vestService.GetVestByName(name);
        //     if (result is null)
        //         return NotFound("Vest not found");

        //     return Ok(result);
        // }


        [HttpPut("update")]
        public async Task<ActionResult<bool>> UpdateVest(VestDetail vestToUpdate) {

            vestToUpdate.Products.Type = GlobalConstant.VestProduct;
            bool result = await _vestService.UpdateVest(vestToUpdate.Products,vestToUpdate.Component);
           
            if (!result)
                return NotFound("Can not Update, please try again");

            return Ok("Update Successfully");
        }


        [HttpDelete("")]
        public async Task<ActionResult<bool>> DeleteVest(int vestId)
        {
            bool result = await _vestService.DeleteVest(vestId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

        }

        [HttpPost("add")]

        public async Task<ActionResult<bool>> AddVest(AddVestDto av)
        {
            bool result = await _vestService.AddVest(av);

            if (!result)
                return NotFound("Cannot insert vest, please try again");

            return Ok("Add Successfully");
        }


    }
}
