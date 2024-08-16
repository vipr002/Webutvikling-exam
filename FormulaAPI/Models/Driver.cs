namespace FormulaAPI.Models;
using FormulaAPI.Interaces;
public class Driver : IDriver
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Age { get; set; }
    public required string Nationality { get; set; }
    public required string Image { get; set; }

}