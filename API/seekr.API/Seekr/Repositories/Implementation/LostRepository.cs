using Seekr.Repositories.Interface;
using Seekr.Data;
using Seekr.Models.DomainModels;

namespace Seekr.Repositories.Implementation
{
    public class LostRepository: ILostRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public LostRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Lost> AddLostAsync(Lost lost)
        {
            await _dbContext.Lost.AddAsync(lost);
            await _dbContext.SaveChangesAsync();
            return lost;
        }
        public async Task<IEnumerable<Lost>> GetAllLostAsync()
        {
            return _dbContext.Lost.ToList();
        }
    }
}
