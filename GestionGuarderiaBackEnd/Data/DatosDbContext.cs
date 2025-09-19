using Microsoft.EntityFrameworkCore;

namespace GestionGuarderiaBackEnd.Data
{
    public class DatosDbContext: DbContext
    {
        public DatosDbContext(DbContextOptions<DatosDbContext> options) : base(options)
        {
        }
        public DbSet<Models.Entidades.NinoModel> Ninos { get; set; }
        public DbSet<Models.Entidades.CuidadorModel> Cuidadores { get; set; }
        public DbSet<Models.Entidades.AsignacionModel> Asignaciones { get; set; }
    }
}
