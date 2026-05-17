using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Seekr.Migrations
{
    /// <inheritdoc />
    public partial class Addedstatusfield : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Lost",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Found",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Lost");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Found");
        }
    }
}
