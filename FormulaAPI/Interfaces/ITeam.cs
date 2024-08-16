namespace FormulaAPI.Interfaces;

public interface ITeam
{
    int Id { get; set; }
    string Manufacturer { get; set; }
    string Image { get; set; }
    string Driver1 { get; set; }
    string Driver2 { get; set; }

}