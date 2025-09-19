using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GestionGuarderiaBackEnd.Models.Entidades
{
    [Table("Asignaciones")]
    public class AsignacionModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AsignacionId { get; set; }

        // Clave foránea hacia Nino
        [Required]
        public int NinoId { get; set; }

        [ForeignKey("NinoId")]
        public ICollection<NinoModel> Ninos { get; set; }

        // Clave foránea hacia Cuidador
        [Required]
        public int CuidadorId { get; set; }

        [ForeignKey("CuidadorId")]
        public CuidadorModel Cuidador { get; set; }

        [Required]
        public DateTime FechaAsignacion { get; set; }

    
        
    }


      

}
