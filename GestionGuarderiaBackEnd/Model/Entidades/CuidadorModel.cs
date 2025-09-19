using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GestionGuarderiaBackEnd.Models.Entidades
{

    [Table("Cuidadores")]
    public class CuidadorModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CuidadorId { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Especialidad { get; set; }

        [Required]
        public string Telefono { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [JsonIgnore]
        public ICollection<AsignacionModel> Asignaciones { get; set; }

        
    }

}
