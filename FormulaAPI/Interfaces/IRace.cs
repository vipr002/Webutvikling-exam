namespace FormulaAPI.Interfaces;

public interface IRace
{
    int Id { get; set; }
    string WinnerName { get; set; }
    double WinnerTime { get; set; }
    string GrandPrix { get; set; }
    int NumberOfLaps { get; set; }
}