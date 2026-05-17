using Microsoft.AspNetCore.Mvc;
using Seekr.Data;
using Seekr.Models.DomainModels;
using Seekr.Repositories.Interface;

namespace Seekr.Repositories.Implementation
{
    public class FoundRepository : IFoundRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public FoundRepository(ApplicationDBContext dbContext)
        {

            _dbContext = dbContext;
        }

        public async Task<Found> AddFoundAsync(Found found)
        {
            await _dbContext.Found.AddAsync(found);
            await _dbContext.SaveChangesAsync();

            return found;
        }
        public async Task<IEnumerable<Found>> GetAllFoundByUserAsync(Guid UserId)
        {
            return _dbContext.Found.Where(x=>x.UserId == UserId).ToList();
        }
        public async Task<Found> GetFoundByIdAsync(Guid id)
        {
            var found = await _dbContext.Found.FindAsync(id);
            return found;
        }
        [HttpGet]
        public async Task<IEnumerable<Found>> GetFoundListAsync()
        {
            return _dbContext.Found.ToList();
        }
        public async Task<Found> UpdateFoundAsync(Found found)
        {
            _dbContext.Found.Update(found);
            await _dbContext.SaveChangesAsync();
            return found;
        }
        public async Task<Found> DeleteFoundByIdAsync(Guid id)
        {
            var found = await _dbContext.Found.FindAsync(id);
            if (found != null)
            {
                _dbContext.Found.Remove(found);
                await _dbContext.SaveChangesAsync();
            }
            return found;
        }
    }
}