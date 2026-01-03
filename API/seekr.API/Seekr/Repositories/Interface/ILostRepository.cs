using Seekr.Models.DomainModels;

namespace Seekr.Repositories.Interface
{
    public interface ILostRepository
    {
        Task<Lost> AddLostAsync(Lost lostandFound);

        Task<IEnumerable<Lost>> GetAllLostByUserAsync(Guid userID);

        Task<Lost> GetLostByIdAsync(Guid id);
        Task<IEnumerable<Lost>> GetLostListAsync();

        Task<Lost> UpdateLostAsync(Lost lostandFound);
        Task<Lost> DeleteLostByIdAsync(Guid id);
    }
}