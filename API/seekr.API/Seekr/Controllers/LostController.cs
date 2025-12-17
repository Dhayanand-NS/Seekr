using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DomainModels;
using Seekr.Models.DTO;
using Seekr.Repositories.Implementation;
using Seekr.Repositories.Interface;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LostController : ControllerBase
    {
        private readonly ILostRepository _lostRepository;
        public LostController(ILostRepository lostRepository)
        {
            _lostRepository = lostRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddLost(LostDTO lost)
        {
            var Lost = new Lost
            {
                Title = lost.Title,
                Description = lost.Description,
                Type = lost.Type,
                ImageURL = lost.ImageURL,
                Latitude = lost.Latitude,
                Longitude = lost.Longitude,
                Location = lost.Location,
                DatePosted = DateTime.UtcNow,
                ContactInfo = lost.ContactInfo,
                Date = lost.Date,
                radius = lost.radius
            };
            var result = await _lostRepository.AddLostAsync(Lost);

            var LostDTO = new LostDTO
            {
                Title = result.Title,
                Description = result.Description,
                Type = result.Type,
                ImageURL = result.ImageURL,
                Latitude = result.Latitude,
                Longitude = result.Longitude,
                Location = result.Location,
                DatePosted = result.DatePosted,
                ContactInfo = result.ContactInfo,
                Date = result.Date,
                radius = result.radius

            };
            return Ok(LostDTO);
        }
        [HttpGet]
        public async Task<IEnumerable<Lost>> GetAllLostandFound()//This method should be renamed as GetAllLostByUser later
        {
            var result = await _lostRepository.GetAllLostAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<Lost> GetLostById(Guid id)
        {
            var result = await _lostRepository.GetLostByIdAsync(id);
            return result;
        }
        [HttpGet]
        [Route("GetLostList")]
        [Authorize(Roles = "Administrator")]
        public async Task<IEnumerable<Lost>> GetLostList()
        {
            var result = await _lostRepository.GetLostListAsync();
            return result;
        }

        [HttpPut]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateLost(LostDTO lost)
        {
            var existingLost = await _lostRepository.GetLostByIdAsync(lost.Id);
            if (existingLost == null)
            {
                return NotFound();
            }
            existingLost.Title = lost.Title;
            existingLost.Description = lost.Description;
            existingLost.Type = lost.Type;
            existingLost.ImageURL = lost.ImageURL;
            existingLost.Latitude = lost.Latitude;
            existingLost.Longitude = lost.Longitude;
            existingLost.Location = lost.Location;
            existingLost.ContactInfo = lost.ContactInfo;
            existingLost.Date = lost.Date;
            existingLost.radius = lost.radius;
            var updatedLost = await _lostRepository.UpdateLostAsync(existingLost);
            return Ok(updatedLost);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteFound(Guid id)
        {
            var existingFound = await _lostRepository.GetLostByIdAsync(id);
            if (existingFound == null)
            {
                return NotFound();
            }
            await _lostRepository.DeleteLostByIdAsync(id);
            return Ok(existingFound);
        }

    }
}
