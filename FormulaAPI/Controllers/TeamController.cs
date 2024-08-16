namespace FormulaAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormulaAPI.Contexts;
using FormulaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly FormulaContext formulaContext;

    public TeamController(FormulaContext _formulaContext)
    {
        formulaContext = _formulaContext;
    }

    [HttpGet]
    public async Task<ActionResult<Team>> GetTeams()
    {
        try
        {
            List<Team> teams = await formulaContext.Teams.ToListAsync();
            if (teams != null)
            {
                return Ok(teams);
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
    public async Task<ActionResult<Team>> GetTeamById(int id)
    {
        try
        {
            Team? team = await formulaContext.Teams.FindAsync(id);
            if (team != null)
            {
                return team;
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
    public async Task<ActionResult> PostTeam(Team newTeam)
    {
        try
        {
            if (newTeam != null)
            {
                formulaContext.Teams.Add(newTeam);
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
    public async Task<IActionResult> PutTeam(Team updatedTeam)
    {
        try
        {
            formulaContext.Entry(updatedTeam).State = EntityState.Modified;
            await formulaContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeam(int id)
    {
        try
        {
            Team? teamToDelete = await formulaContext.Teams.FindAsync(id);
            if (teamToDelete != null)
            {
                formulaContext.Teams.Remove(teamToDelete);
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