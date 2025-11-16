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
        public async Task<IEnumerable<Found>> GetAllFoundAsync()
        {
            return _dbContext.Found.ToList();
        }
    }
}