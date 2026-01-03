using Seekr.Models.DomainModels;

namespace Seekr.Repositories.Interface
{
    public interface IFoundRepository
    {
        Task<Found> AddFoundAsync(Found lostandFound);

        Task<IEnumerable<Found>> GetAllFoundByUserAsync(Guid UserId);

        Task<Found> GetFoundByIdAsync(Guid id);
        Task<IEnumerable<Found>> GetFoundListAsync();
        Task<Found> UpdateFoundAsync(Found lostandFound);
        Task<Found> DeleteFoundByIdAsync(Guid id);
    }
}