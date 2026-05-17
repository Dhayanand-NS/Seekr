using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Seekr.Migrations
{
    /// <inheritdoc />
    public partial class AddedClaimedByField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ClaimedBy",
                table: "Lost",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ClaimedBy",
                table: "Found",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClaimedBy",
                table: "Lost");

            migrationBuilder.DropColumn(
                name: "ClaimedBy",
                table: "Found");
        }
    }
}
