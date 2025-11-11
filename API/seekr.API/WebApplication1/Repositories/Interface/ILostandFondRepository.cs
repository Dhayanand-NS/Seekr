using WebApplication1.Models.DomainModels;

namespace WebApplication1.Repositories.Interface
{
    public interface ILostandFondRepository
    {
        Task<LostandFound> AddLostandFoundAsync(LostandFound lostandFound);

        Task<IEnumerable<LostandFound>> GetAllLostandFoundAsync();
    }
}
