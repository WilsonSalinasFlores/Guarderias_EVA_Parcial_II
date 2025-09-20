using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionGuarderiaBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AsignacionModelNinoModel");

            migrationBuilder.CreateIndex(
                name: "IX_Asignaciones_NinoId",
                table: "Asignaciones",
                column: "NinoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asignaciones_Ninos_NinoId",
                table: "Asignaciones",
                column: "NinoId",
                principalTable: "Ninos",
                principalColumn: "NinoId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asignaciones_Ninos_NinoId",
                table: "Asignaciones");

            migrationBuilder.DropIndex(
                name: "IX_Asignaciones_NinoId",
                table: "Asignaciones");

            migrationBuilder.CreateTable(
                name: "AsignacionModelNinoModel",
                columns: table => new
                {
                    NinoId = table.Column<int>(type: "int", nullable: false),
                    NinosNinoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AsignacionModelNinoModel", x => new { x.NinoId, x.NinosNinoId });
                    table.ForeignKey(
                        name: "FK_AsignacionModelNinoModel_Asignaciones_NinoId",
                        column: x => x.NinoId,
                        principalTable: "Asignaciones",
                        principalColumn: "AsignacionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AsignacionModelNinoModel_Ninos_NinosNinoId",
                        column: x => x.NinosNinoId,
                        principalTable: "Ninos",
                        principalColumn: "NinoId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AsignacionModelNinoModel_NinosNinoId",
                table: "AsignacionModelNinoModel",
                column: "NinosNinoId");
        }
    }
}
