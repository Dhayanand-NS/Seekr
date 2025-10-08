using Microsoft.EntityFrameworkCore;
using WebApplication1.Models.DomainModels;

namespace WebApplication1.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
        public DbSet<LostandFound> LostandFound { get; set; }
    }
}