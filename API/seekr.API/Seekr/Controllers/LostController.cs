using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DomainModels;
using Seekr.Models.DTO;
using Seekr.Repositories.Implementation;
using Seekr.Repositories.Interface;
using System.Data;
using System.Security.Claims;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LostController : ControllerBase
    {
        private readonly ILostRepository _lostRepository;
        private readonly IFoundRepository _foundRepository;
        public LostController(ILostRepository lostRepository, IFoundRepository foundRepository)
        {
            _lostRepository = lostRepository;
            _foundRepository = foundRepository;
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> AddLost(LostDTO lost)
        {
            var userID = User.FindFirstValue(ClaimTypes.NameIdentifier);
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
                radius = lost.radius,
                UserId = Guid.Parse(userID),
                Status= "Pending"
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
        public async Task<IEnumerable<Lost>> GetAllLostByUser()
        {
            var userID = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _lostRepository.GetAllLostByUserAsync(userID);
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


        [HttpPut]
        [Route("UpdateLostStatus/{status}/{matchedId}/{currentId}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> UpdateLostStatus(string status, Guid matchedId, Guid currentId)
        {
            var existingFound = await _foundRepository.GetFoundByIdAsync(matchedId);
            var existingLost = await _lostRepository.GetLostByIdAsync(currentId);
            if (existingFound == null || existingLost == null)
            {
                return NotFound();
            }
            existingFound.Status = status;
            existingFound.ClaimedBy = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            existingLost.Status = status;
            existingLost.ClaimedBy = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _lostRepository.UpdateLostAsync(existingLost);
            var updatedFound = await _foundRepository.UpdateFoundAsync(existingFound);
            return Ok(updatedFound);
        }
    }
}
