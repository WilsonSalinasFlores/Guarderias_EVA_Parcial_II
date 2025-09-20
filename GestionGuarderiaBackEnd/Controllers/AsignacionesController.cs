using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionGuarderiaBackEnd.Data;
using GestionGuarderiaBackEnd.Models.Entidades;

namespace GestionGuarderiaBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignacionesController : ControllerBase
    {
        private readonly DatosDbContext _context;

        public AsignacionesController(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/Asignaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsignacionModel>>> GetAsignaciones()
        {
            return await _context.Asignaciones.ToListAsync();
        }

        // GET: api/Asignaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AsignacionModel>> GetAsignacionModel(int id)
        {
            var asignacionModel = await _context.Asignaciones.FindAsync(id);

            if (asignacionModel == null)
            {
                return NotFound();
            }

            return asignacionModel;
        }

        // GET: api/Asignaciones/5
        [HttpGet("PorCuidador/{id}")]
        public async Task<ActionResult<IEnumerable<AsignacionModel>>> GetAsignacionByCuidadorModel(int id)
        {
            var asignacionModel = await _context.Asignaciones.Where(a=> a.CuidadorId==id)
                .Include(a=> a.Nino)
                .Include(a=> a.Cuidador)
                .ToListAsync();

            if (asignacionModel == null)
            {
                return NotFound();
            }

            return asignacionModel;
        }

        // PUT: api/Asignaciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsignacionModel(int id, AsignacionModel asignacionModel)
        {
            if (id != asignacionModel.AsignacionId)
            {
                return BadRequest();
            }

            _context.Entry(asignacionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsignacionModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Asignaciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AsignacionModel>> PostAsignacionModel(AsignacionModel asignacionModel)
        {
            _context.Asignaciones.Add(asignacionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsignacionModel", new { id = asignacionModel.AsignacionId }, asignacionModel);
        }

        // DELETE: api/Asignaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsignacionModel(int id)
        {
            var asignacionModel = await _context.Asignaciones.FindAsync(id);
            if (asignacionModel == null)
            {
                return NotFound();
            }

            _context.Asignaciones.Remove(asignacionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AsignacionModelExists(int id)
        {
            return _context.Asignaciones.Any(e => e.AsignacionId == id);
        }
    }
}
