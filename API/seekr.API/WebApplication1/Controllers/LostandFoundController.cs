using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models.DomainModels;
using WebApplication1.Models.DTO;
using WebApplication1.Repositories.Interface;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LostandFoundController : ControllerBase
    {
        private readonly ILostandFondRepository _lostandFoundRepository;
        public LostandFoundController(ILostandFondRepository lostandFondRepository) {
            _lostandFoundRepository = lostandFondRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddLostandFound(LostandFoundDTO lostandFound)
        {
            var LostadFound = new LostandFound
            {
                Title = lostandFound.Title,
                Description = lostandFound.Description,
                Type = lostandFound.Type,
                ImageURL = lostandFound.ImageURL,
                Latitude = lostandFound.Latitude,
                Longitude = lostandFound.Longitude,
                Location = lostandFound.Location,
                DatePosted = DateTime.UtcNow,
                ContactInfo = lostandFound.ContactInfo
            };
            var result = await _lostandFoundRepository.AddLostandFoundAsync(LostadFound);
            
            var LostandFoundDTO = new LostandFoundDTO
            {
                Title = result.Title,
                Description = result.Description,
                Type = result.Type,
                ImageURL = result.ImageURL,
                Latitude = result.Latitude,
                Longitude = result.Longitude,
                Location = result.Location,
                DatePosted = result.DatePosted,
                ContactInfo = result.ContactInfo
            };
            {

            }
            return Ok(LostandFoundDTO);
        }


    }
}
