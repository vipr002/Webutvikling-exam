namespace FormulaAPI.Models;

using FormulaAPI.Interfaces;

public class Race : IRace
{
    public int Id { get; set; }
    public required string WinnerName { get; set; }
    public double WinnerTime { get; set; }
    public required string GrandPrix { get; set; }
    public int NumberOfLaps { get; set; }
}