﻿using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.PantsService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

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
        public async Task<ActionResult<Product>> GetAll()
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
        [HttpGet("{id}")]
        public ActionResult<PantsDetail> GetPantsById(int id)
        {
            var result = _pantsService.GetPantsDetailById(id);
            if (result is null)
                return NotFound("Pants not found");

            return Ok(result);
        }

        // get by id
        // get by category ??
        // insert one - just for admin
        [HttpGet("Add-Pants")]

        public async Task<ActionResult<bool>> AddPants(AddPants ap)
        {
            bool result = await _pantsService.AddPants(ap);
            if (!result)
                return NotFound("Cannot insert pants, please try again");

            return Ok("Add Successfully");
        }


    }
}
