using Microsoft.EntityFrameworkCore;
using Seekr.Models.DomainModels;

namespace Seekr.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }
        public DbSet<Lost> Lost { get; set; }
        public DbSet<Found> Found { get; set; }
    }
}