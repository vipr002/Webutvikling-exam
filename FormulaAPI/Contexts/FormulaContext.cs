namespace FormulaAPI.Contexts;

using Microsoft.EntityFrameworkCore;
using FormulaAPI.Models;

public class FormulaContext : DbContext
{

    public FormulaContext(DbContextOptions<FormulaContext> options) : base(options) { }

    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Race> Races { get; set; }
    public DbSet<Team> Teams { get; set; }

}