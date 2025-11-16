using Seekr.Models.DomainModels;

namespace Seekr.Repositories.Interface
{
    public interface ILostRepository
    {
        Task<Lost> AddLostAsync(Lost lostandFound);

        Task<IEnumerable<Lost>> GetAllLostAsync();
    }
}