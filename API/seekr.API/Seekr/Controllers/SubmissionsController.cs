using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DTO;
using Seekr.Repositories.Implementation;
using Seekr.Repositories.Interface;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionsController : Controller
    {
        private readonly ILostRepository _lostRepository;
        private readonly IFoundRepository _foundRepository;
        public SubmissionsController(ILostRepository lostRepository, IFoundRepository foundRepository) {
            _lostRepository = lostRepository;
            _foundRepository = foundRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSubmissionsByUser()
        {
            var lostItems = await _lostRepository.GetAllLostAsync();
            var foundItems = await _foundRepository.GetAllFoundAsync();
            var SubmissionsDTO = new List<SubmissionsDTO>();
            SubmissionsDTO.AddRange(lostItems.Select(lost => new SubmissionsDTO
            {
                Title = lost.Title,
                Description = lost.Description,
                Type = lost.Type,
                ImageURL = lost.ImageURL,
                Latitude = lost.Latitude,
                Longitude = lost.Longitude,
                Location = lost.Location,
                DatePosted = lost.DatePosted,
                ContactInfo = lost.ContactInfo,
                Date = lost.Date,
                radius = lost.radius,
                IsMatched = false,
                MatchedId = null
            }));
            SubmissionsDTO.AddRange(foundItems.Select(found => new SubmissionsDTO
            {
                Title = found.Title,
                Description = found.Description,
                Type = found.Type,
                ImageURL = found.ImageURL,
                Latitude = found.Latitude,
                Longitude = found.Longitude,
                Location = found.Location,
                DatePosted = found.DatePosted,
                ContactInfo = found.ContactInfo,
                Date = found.Date,
                radius = found.radius,
                IsMatched = false,
                MatchedId = null
            }));
            // Matching Logic
            foreach (var lost in lostItems)
            {
                foreach (var found in foundItems)
                {
                    var distance = await GetDistance(lost.Latitude, lost.Longitude, found.Latitude, found.Longitude);
                    if (distance <= Math.Max(lost.radius, found.radius))
                    {
                        var lostDTO = SubmissionsDTO.Where(s => s.Title == lost.Title && s.Type == "Lost").FirstOrDefault();
                        var foundDTO = SubmissionsDTO.Where(s => s.Title == found.Title && s.Type == "Found").FirstOrDefault();
                        if (lostDTO != null && foundDTO != null)
                        {
                            lostDTO.IsMatched = true;
                            lostDTO.MatchedId = found.Id;
                            foundDTO.IsMatched = true;
                            foundDTO.MatchedId = lost.Id;
                        }
                    }
                }
            }


            //var submissionsViewModel = new SubmissionsViewModel
            //{
            //    LostItems = lostItems,
            //    FoundItems = foundItems
            //};
            return Ok(SubmissionsDTO);
        }
        private async Task<double> GetDistance(double lat1, double lon1, double lat2, double lon2)
        {
            double R = 6371000; // radius of Earth in meters
            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLon = (lon2 - lon1) * Math.PI / 180;

            var a =
                Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(lat1 * Math.PI / 180) * Math.Cos(lat2 * Math.PI / 180) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var distance = R * c;

            return distance; // meters
        }

    }
}
