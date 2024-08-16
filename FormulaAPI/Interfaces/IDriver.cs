namespace FormulaAPI.Interaces;


public interface IDriver
{
    int Id { get; set; }
    string Name { get; set; }
    int Age { get; set; }
    string Nationality { get; set; }
    string Image { get; set; }
    // bool IsProfessional { get; set; }
}