using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Seekr.Data
{
    public class AuthDBContext : IdentityDbContext
    {
        public AuthDBContext(DbContextOptions<AuthDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var userRoleID = "8f2c4b6e-1d3b-4e5f-9a1b-2c3d4e5f6a7b";
            var adminRoleID = "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

            //Creating Roles
            var role = new List<IdentityRole> {
                new IdentityRole
                {
                    Id = adminRoleID,
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR",
                    ConcurrencyStamp = adminRoleID
                },
                new IdentityRole
                {
                    Id = userRoleID,
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = userRoleID
                }
            };

            //Seeding Roles to the Database
            builder.Entity<IdentityRole>().HasData(role);

            //Creating an Admin User
            var adminUserId = "0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d";
            var adminUser = new IdentityUser
            {
                Id = adminUserId,
                UserName = "admin@gmail.com",
                Email = "admin@gmail.com",
                NormalizedEmail = "admin@gmail.com".ToUpper(),
                NormalizedUserName = "admin@gmail.com".ToUpper()
            };
            adminUser.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(adminUser, "Admin@123");

            //Seeding Admin User to the Database
            builder.Entity<IdentityUser>().HasData(adminUser);

            //Assigninig roles to the Admin User {Admin has both user and admin roles}
            var adminUserRoles = new List<IdentityUserRole<string>>
            {
                new IdentityUserRole<string>
                {
                    RoleId = adminRoleID,
                    UserId = adminUserId
                },
                new IdentityUserRole<string>
                {
                    RoleId = userRoleID,
                    UserId = adminUserId
                }
            };
            //seeding UserRoles to the Database
            builder.Entity<IdentityUserRole<string>>().HasData(adminUserRoles);


        }
    }
}
