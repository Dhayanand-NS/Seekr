using WebApplication1.Data;
using WebApplication1.Models.DomainModels;
using WebApplication1.Repositories.Interface;

namespace WebApplication1.Repositories.Implementation
{
    public class LostandFoundRepository:ILostandFondRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public LostandFoundRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<LostandFound> AddLostandFoundAsync(LostandFound lostandFound)
        {
            await _dbContext.LostandFound.AddAsync(lostandFound);
            await _dbContext.SaveChangesAsync();
            return lostandFound;
        }
        public async Task<IEnumerable<LostandFound>> GetAllLostandFoundAsync()
        {
            return _dbContext.LostandFound.ToList();
        }
    }
}
