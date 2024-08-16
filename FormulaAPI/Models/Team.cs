namespace FormulaAPI.Models;
using FormulaAPI.Interfaces;

public class Team : ITeam
{
    public int Id { get; set; }
    public required string Manufacturer { get; set; }
    public required string Image { get; set; }
    public required string Driver1 { get; set; }
    public required string Driver2 { get; set; }
}