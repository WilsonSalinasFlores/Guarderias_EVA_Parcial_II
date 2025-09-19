using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GestionGuarderiaBackEnd.Models.Entidades
{
    [Table("Ninos")]
    public class NinoModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NinoId { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public DateTime FechaNacimiento { get; set; }

        public string Alergias { get; set; }

        [JsonIgnore]
        public ICollection<AsignacionModel> Asignaciones { get; set; }

    }

}
