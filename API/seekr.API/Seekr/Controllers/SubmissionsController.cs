using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DTO;
using Seekr.Repositories.Implementation;
using Seekr.Repositories.Interface;
using System.Security.Claims;

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

        [HttpPost]
        public async Task<IActionResult> GetAllSubmissionsByUser(SubmissionFilter filters)
        {
            bool isMatchFound = filters.MatchFound != null && filters.MatchFound.ToLower() == "true";
            var predicate = PredicateBuilder.New<SubmissionsDTO>(true);
            if (filters.Type != null)
            {
                predicate = predicate.And(c => c.Type == filters.Type);
            }
            if (filters.MatchFound != null)
            {
                predicate = predicate.And(c => c.IsMatched == isMatchFound);
            }
            //if (filters.Date != null)
            //{
            //    predicate = predicate.And(c => c.DatePosted >= filters.Date);
            //}
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var myLostItems =  (await _lostRepository.GetAllLostByUserAsync(userId)).ToList();
            var myFoundItems =  (await _foundRepository.GetAllFoundByUserAsync(userId)).ToList();
            var lostItems =  (await _lostRepository.GetLostListAsync()).ToList();
            var foundItems =  (await _foundRepository.GetFoundListAsync()).ToList();
            var SubmissionsDTO = new List<SubmissionsDTO>();
            SubmissionsDTO.AddRange(myLostItems.Select(lost => new SubmissionsDTO
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
                MatchedId = null,
                CurrentId = null
            }));
            SubmissionsDTO.AddRange(myFoundItems.Select(found => new SubmissionsDTO
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
                MatchedId = null,
                CurrentId = null
            }));
            // Matching Logic
            foreach (var lost in myLostItems)
            {
                foreach (var found in foundItems.Where(x=>x.UserId != userId).ToList())
                {
                    var distance = await GetDistance(lost.Latitude, lost.Longitude, found.Latitude, found.Longitude);
                    if (distance <= Math.Max(lost.radius, found.radius))
                    {
                        var lostDTO = SubmissionsDTO.Where(s => s.Title == lost.Title && s.Type == "Lost" && s.Title == found.Title).FirstOrDefault();
                        var foundDTO = foundItems.Where(s => s.Title == found.Title && s.Type == "Found" && s.Title == lost.Title && ((found.ClaimedBy == userId && (found.Status != "Claimed" || found.Status != "Confirmed" || found.Status != "Resolved")) || found.Status == "Pending")).FirstOrDefault();
                        if (lostDTO != null && foundDTO != null)
                        {
                            lostDTO.IsMatched = true;
                            lostDTO.MatchedId = found.Id;
                            lostDTO.MatchedLatitude = found.Latitude;
                            lostDTO.MatchedLongitude = found.Longitude;
                            lostDTO.CurrentId = lost.Id;

                            //foundDTO.IsMatched = true;
                            //foundDTO.MatchedId = lost.Id;
                            //foundDTO.MatchedLatitude = lost.Latitude;
                            //foundDTO.MatchedLongitude = lost.Longitude;
                        }
                    }
                }
            }
            foreach (var found in myFoundItems)
            {
                foreach (var lost in lostItems.Where(x => x.UserId != userId).ToList())
                {
                    var distance = await GetDistance(lost.Latitude, lost.Longitude, found.Latitude, found.Longitude);
                    if (distance <= Math.Max(lost.radius, found.radius))
                    {
                        var lostDTO = lostItems.Where(s => s.Title == lost.Title && s.Type == "Lost" && s.Title == found.Title && found.Status != "Resolved").FirstOrDefault();
                        var foundDTO = SubmissionsDTO.Where(s => s.Title == found.Title && s.Type == "Found" && s.Title == lost.Title).FirstOrDefault();
                        if (lostDTO != null && foundDTO != null)
                        {
                            //lostDTO.IsMatched = true;
                            //lostDTO.MatchedId = found.Id;
                            //lostDTO.MatchedLatitude = found.Latitude;
                            //lostDTO.MatchedLongitude = found.Longitude;

                            foundDTO.IsMatched = true;
                            foundDTO.MatchedId = lost.Id;
                            foundDTO.MatchedLatitude = lost.Latitude;
                            foundDTO.MatchedLongitude = lost.Longitude;
                            foundDTO.CurrentId = found.Id;
                        }
                    }
                }
            }


            //var submissionsViewModel = new SubmissionsViewModel
            //{
            //    LostItems = lostItems,
            //    FoundItems = foundItems
            //};
            SubmissionsDTO = SubmissionsDTO.Where(predicate).ToList();
            var skip = (filters.PageNumber - 1) * filters.PageSize;
            SubmissionsDTO = SubmissionsDTO.Skip(skip).Take(filters.PageSize).ToList();
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
        [HttpGet]
        [Route("count")]
        public async Task<int> GetMySubmissionsCount()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var myLostItems = (await _lostRepository.GetAllLostByUserAsync(userId)).ToList();
            var myFoundItems = (await _foundRepository.GetAllFoundByUserAsync(userId)).ToList();
            return myLostItems.Count + myFoundItems.Count;
        }

    }
}


