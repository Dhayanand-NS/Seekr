using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DTO;
using Seekr.Repositories.Interface;

namespace Seekr.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class LostandFoundList : ControllerBase
    {
        public readonly IFoundRepository _foundRepository;
        public readonly ILostRepository _lostRepository;
        public LostandFoundList(ILostRepository lostRepository, IFoundRepository foundRepository)
        {
            _lostRepository = lostRepository;
            _foundRepository = foundRepository;
        }
        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetAllLostAndFoundItems(LostFoundListFilter filters)
        {
            var predicate = PredicateBuilder.New<LostandFoundListDTO>(true);
            if (filters.Type != null)
            {
                predicate = predicate.And(c => c.Type == filters.Type);
            }
            if (filters.Item != null && filters.Item != "")
            {
                predicate = predicate.And(c => filters.Item.ToLower().Equals(c.Title.ToLower()));
            }
            var lostItems = await _lostRepository.GetLostListAsync();
            var foundItems = await _foundRepository.GetFoundListAsync();
            List<LostandFoundListDTO> lostfoundlist = new();
            lostfoundlist.AddRange(lostItems.Select(list => new LostandFoundListDTO
            {
                Id = list.Id,
                Title = list.Title,
                Description = list.Description,
                Type = "Lost",
                ImageURL = list.ImageURL,
                Latitude = list.Latitude,
                Longitude = list.Longitude,
                Location = list.Location,
                DatePosted = list.DatePosted,
                ContactInfo = list.ContactInfo,
                Date = list.Date,
                radius = list.radius

            }));
            lostfoundlist.AddRange(foundItems.Select(list => new LostandFoundListDTO
            {
                Id = list.Id,
                Title = list.Title,
                Description = list.Description,
                Type = "Found",
                ImageURL = list.ImageURL,
                Latitude = list.Latitude,
                Longitude = list.Longitude,
                Location = list.Location,
                DatePosted = list.DatePosted,
                ContactInfo = list.ContactInfo,
                Date = list.Date,
                radius = list.radius
            }));
            lostfoundlist = lostfoundlist.OrderByDescending(x => x.DatePosted).ToList();
            lostfoundlist = lostfoundlist.Where(predicate).ToList();
            var skip = (filters.PageNumber - 1) * filters.PageSize;
            lostfoundlist = lostfoundlist.Skip(skip).Take(filters.PageSize).ToList();
            return Ok(lostfoundlist);
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("Count")]
        public async Task<int> GetLostAndFoundCount()
        {
            var lostItems = await _lostRepository.GetLostListAsync();
            var foundItems = await _foundRepository.GetFoundListAsync();
            int totalCount = lostItems.Count() + foundItems.Count();
            return totalCount;
        }
    }
}
