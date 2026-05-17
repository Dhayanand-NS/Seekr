using Microsoft.EntityFrameworkCore;
using Seekr.Data;
using Seekr.Models.DomainModels;
using Seekr.Repositories.Interface;

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
        public async Task<IEnumerable<Lost>> GetAllLostByUserAsync(Guid UserID)
        {
            return _dbContext.Lost.Where(x=> x.UserId == UserID).ToList();
        }
        public async Task<Lost> GetLostByIdAsync(Guid id)
        {
            var lost = await _dbContext.Lost.FindAsync(id);
            return lost;
        }
        public async Task<IEnumerable<Lost>> GetLostListAsync()
        {
            IQueryable<Lost> test =  _dbContext.Lost.Where(x=>x.Type == "Lost").AsQueryable();
            return test;
        }
        public async Task<Lost> UpdateLostAsync(Lost lost)
        {
            _dbContext.Lost.Update(lost);
            await _dbContext.SaveChangesAsync();
            return lost;
        }
        public async Task<Lost> DeleteLostByIdAsync(Guid id)
        {
            var lost = await _dbContext.Lost.FindAsync(id);
            if (lost != null)
            {
                _dbContext.Lost.Remove(lost);
                await _dbContext.SaveChangesAsync();
            }
            return lost;
        }
    }
}
