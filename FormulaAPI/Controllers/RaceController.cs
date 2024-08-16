namespace FormulaAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormulaAPI.Contexts;
using FormulaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class RaceController : ControllerBase
{
    private readonly FormulaContext formulaContext;

    public RaceController(FormulaContext _formulaContext)
    {
        formulaContext = _formulaContext;
    }

    [HttpGet]
    public async Task<ActionResult<Race>> GetRaces()
    {
        try
        {
            List<Race> races = await formulaContext.Races.ToListAsync();
            if (races != null)
            {
                return Ok(races);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> GetRaceById(int id)
    {
        try
        {
            Race? race = await formulaContext.Races.FindAsync(id);
            if (race != null)
            {
                return race;
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {

            return StatusCode(500);
        }

    }
    [HttpPost]
    public async Task<ActionResult> PostRace(Race newRace)
    {
        try
        {
            if (newRace != null)
            {
                formulaContext.Races.Add(newRace);
                await formulaContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }
    [HttpPut]
    public async Task<IActionResult> PutRace(Race updatedRace)
    {
        try
        {
            formulaContext.Entry(updatedRace).State = EntityState.Modified;
            await formulaContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRace(int id)
    {
        try
        {
            Race? raceToDelete = await formulaContext.Races.FindAsync(id);
            if (raceToDelete != null)
            {
                formulaContext.Races.Remove(raceToDelete);
                await formulaContext.SaveChangesAsync();
                return NoContent();
            }
            else
            {
                return NotFound();
            }


        }
        catch
        {
            return StatusCode(500);
        }
    }
}