using Microsoft.AspNetCore.Identity;

namespace Seekr.Repositories.Interface
{
    public interface ITokenRepository
    {
        string CreateToken(IdentityUser user, List<string> roles);

    }
}
