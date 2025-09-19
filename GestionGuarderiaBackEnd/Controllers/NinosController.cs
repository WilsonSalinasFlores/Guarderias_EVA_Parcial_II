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
    public class NinosController : ControllerBase
    {
        private readonly DatosDbContext _context;

        public NinosController(DatosDbContext context)
        {
            _context = context;
        }

        // GET: api/Ninos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NinoModel>>> GetNinos()
        {
            return await _context.Ninos.ToListAsync();
        }

        // GET: api/Ninos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NinoModel>> GetNinoModel(int id)
        {
            var ninoModel = await _context.Ninos.FindAsync(id);

            if (ninoModel == null)
            {
                return NotFound();
            }

            return ninoModel;
        }

        // PUT: api/Ninos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNinoModel(int id, NinoModel ninoModel)
        {
            if (id != ninoModel.NinoId)
            {
                return BadRequest();
            }

            _context.Entry(ninoModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NinoModelExists(id))
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

        // POST: api/Ninos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NinoModel>> PostNinoModel(NinoModel ninoModel)
        {
            _context.Ninos.Add(ninoModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNinoModel", new { id = ninoModel.NinoId }, ninoModel);
        }

        // DELETE: api/Ninos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNinoModel(int id)
        {
            var ninoModel = await _context.Ninos.FindAsync(id);
            if (ninoModel == null)
            {
                return NotFound();
            }

            _context.Ninos.Remove(ninoModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NinoModelExists(int id)
        {
            return _context.Ninos.Any(e => e.NinoId == id);
        }
    }
}
