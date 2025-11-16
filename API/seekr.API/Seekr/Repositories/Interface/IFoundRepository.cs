using Seekr.Models.DomainModels;

namespace Seekr.Repositories.Interface
{
    public interface IFoundRepository
    {
        Task<Found> AddFoundAsync(Found lostandFound);

        Task<IEnumerable<Found>> GetAllFoundAsync();
    }
}