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
    public class CuidadoresController : ControllerBase
    {
        private readonly DatosDbContext _context;

        public CuidadoresController(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/Cuidadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CuidadorModel>>> GetCuidadores()
        {
            return await _context.Cuidadores.ToListAsync();
        }

        // GET: api/Cuidadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CuidadorModel>> GetCuidadorModel(int id)
        {
            var cuidadorModel = await _context.Cuidadores.FindAsync(id);

            if (cuidadorModel == null)
            {
                return NotFound();
            }

            return cuidadorModel;
        }

        // PUT: api/Cuidadores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCuidadorModel(int id, CuidadorModel cuidadorModel)
        {
            if (id != cuidadorModel.CuidadorId)
            {
                return BadRequest();
            }

            _context.Entry(cuidadorModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CuidadorModelExists(id))
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

        // POST: api/Cuidadores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CuidadorModel>> PostCuidadorModel(CuidadorModel cuidadorModel)
        {
            _context.Cuidadores.Add(cuidadorModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCuidadorModel", new { id = cuidadorModel.CuidadorId }, cuidadorModel);
        }

        // DELETE: api/Cuidadores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuidadorModel(int id)
        {
            var cuidadorModel = await _context.Cuidadores.FindAsync(id);
            if (cuidadorModel == null)
            {
                return NotFound();
            }

            _context.Cuidadores.Remove(cuidadorModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CuidadorModelExists(int id)
        {
            return _context.Cuidadores.Any(e => e.CuidadorId == id);
        }
    }
}
