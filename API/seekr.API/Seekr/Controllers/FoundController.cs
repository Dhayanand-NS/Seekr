using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DomainModels;
using Seekr.Models.DTO;
using Seekr.Repositories.Interface;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoundController : ControllerBase
    {
        private readonly IFoundRepository _foundRepository;
        public FoundController(IFoundRepository foundRepository)
        {
            _foundRepository = foundRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddFound(Found found)
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
                radius = found.radius
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
        public async Task<IEnumerable<Found>> GetAllFound()
        {
            var result = await _foundRepository.GetAllFoundAsync();

            return result;
        }
    }
}
