using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DomainModels;
using Seekr.Models.DTO;
using Seekr.Repositories.Interface;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LostController : ControllerBase
    {
        private readonly ILostRepository _lostRepository;
        public LostController(ILostRepository lostRepository) {
            _lostRepository = lostRepository;
        }
        
        [HttpPost]
        public async Task<IActionResult> AddLost(Lost lost)
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
        public async Task<IEnumerable<Lost>> GetAllLostandFound()
        {
            var result = await _lostRepository.GetAllLostAsync();

            return result;
        }
    }
}
