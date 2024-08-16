namespace FormulaAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FormulaAPI.Contexts;
using FormulaAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class DriverController : ControllerBase
{
    private readonly FormulaContext formulaContext;

    public DriverController(FormulaContext _formulaContext)
    {
        formulaContext = _formulaContext;
    }

    [HttpGet]
    public async Task<ActionResult<Driver>> GetDrivers()
    {
        try
        {
            List<Driver> drivers = await formulaContext.Drivers.ToListAsync();
            if (drivers != null)
            {
                return Ok(drivers);
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
    public async Task<ActionResult<Driver>> GetDriverById(int id)
    {
        try
        {
            Driver? driver = await formulaContext.Drivers.FindAsync(id);
            if (driver != null)
            {
                return driver;
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

    [HttpGet]
    [Route("[action]/{name}")]
    public async Task<ActionResult<IEnumerable<Driver>>> GetDriverByName(string name)
    {
        try
        {
            List<Driver> drivers = await formulaContext.Drivers.Where(x => x.Name == name).ToListAsync();
            if (drivers != null)
            {
                return drivers;
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
    public async Task<IActionResult> PostDriver(Driver newDriver)
    {
        try
        {
            if (newDriver != null)
            {

                formulaContext.Drivers.Add(newDriver);
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
    public async Task<IActionResult> PutDriver(Driver updatedDriver)
    {
        try
        {
            formulaContext.Entry(updatedDriver).State = EntityState.Modified;
            await formulaContext.SaveChangesAsync();
            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDriver(int id)
    {
        try
        {
            Driver? driverToDelete = await formulaContext.Drivers.FindAsync(id);
            if (driverToDelete != null)
            {
                formulaContext.Drivers.Remove(driverToDelete);
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