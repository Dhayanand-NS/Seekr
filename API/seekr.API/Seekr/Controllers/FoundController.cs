using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DomainModels;
using Seekr.Models.DTO;
using Seekr.Repositories.Implementation;
using Seekr.Repositories.Interface;
using System.Security.Claims;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoundController : ControllerBase
    {
        private readonly IFoundRepository _foundRepository;
        private readonly ILostRepository _lostRepository;
        public FoundController(IFoundRepository foundRepository, ILostRepository lostRepository)
        {
            _foundRepository = foundRepository;
            _lostRepository = lostRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddFound(FoundDTO found)
        {
            var Found = new Found
            {
                Title = found.Title,
                Description = found.Description,
                Type = found.Type,
                ImageURL = found.ImageURL,
                Latitude = found.Latitude,
                Longitude = found.Longitude,
                Location = found.Location,
                DatePosted = DateTime.UtcNow,
                ContactInfo = found.ContactInfo,
                Date = found.Date,
                radius = found.radius,
                UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)),
                Status = "Pending"
            };
            var result = await _foundRepository.AddFoundAsync(Found);

            var foundDTO = new FoundDTO
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
            return Ok(foundDTO);
        }
        [HttpGet]
        public async Task<IEnumerable<Found>> GetAllFoundByUser()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var result = await _foundRepository.GetAllFoundByUserAsync(userId);

            return result;
        }
        [HttpGet("{id}")]
        
        public async Task<Found> GetFoundById(Guid id)
        {
            var result = await _foundRepository.GetFoundByIdAsync(id);
            return result;
        }
        [HttpGet]
        [Route("GetFoundList")]
        [Authorize(Roles ="Administrator")]
        public async Task<IEnumerable<Found>> GetFoundList()
        {
            var result = await _foundRepository.GetFoundListAsync();
            return result;
        }

        [HttpPut]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> UpdateFound(FoundDTO found)
        {
            var existingFound = await _foundRepository.GetFoundByIdAsync(found.Id);
            if (existingFound == null)
            {
                return NotFound();
            }
            existingFound.Title = found.Title;
            existingFound.Description = found.Description;
            existingFound.Type = found.Type;
            existingFound.ImageURL = found.ImageURL;
            existingFound.Latitude = found.Latitude;
            existingFound.Longitude = found.Longitude;
            existingFound.Location = found.Location;
            existingFound.ContactInfo = found.ContactInfo;
            existingFound.Date = found.Date;
            existingFound.radius = found.radius;
            var updatedFound = await _foundRepository.UpdateFoundAsync(existingFound);
            return Ok(updatedFound);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteFound(Guid id)
        {
            var existingFound = await _foundRepository.GetFoundByIdAsync(id);
            if (existingFound == null)
            {
                return NotFound();
            }
            await _foundRepository.DeleteFoundByIdAsync(id);
            return Ok(existingFound);
        }

        [HttpPut]
        [Route("UpdateFoundStatus/{status}/{matchedId}/{currentId}")]
        [Authorize(Roles = "Administrator,User")]
        public async Task<IActionResult> UpdateFoundStatus(string status, Guid matchedId, Guid currentId)
        {
            var existingFound = await _foundRepository.GetFoundByIdAsync(currentId);
            var existingLost = await _lostRepository.GetLostByIdAsync(matchedId);
            if (existingFound == null || existingLost == null)
            {
                return NotFound();
            }
            existingFound.Status = status == "Rejected" ? "Pending" : status;
            existingLost.Status = status == "Rejected" ? "Pending" : status;
            await _lostRepository.UpdateLostAsync(existingLost);
            var updatedFound = await _foundRepository.UpdateFoundAsync(existingFound);
            return Ok(updatedFound);
        }
    }
}
