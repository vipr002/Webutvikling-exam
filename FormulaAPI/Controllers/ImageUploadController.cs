namespace FormulaAPI.Controllers;

using Microsoft.AspNetCore.Mvc;

//microsoft anbefaler at man har en separat kontroller for image upload
[ApiController]
[Route("api/[controller]")]
public class ImageUploadController : ControllerBase
{

    private readonly IWebHostEnvironment environment;

    public ImageUploadController(IWebHostEnvironment _environment)
    {
        environment = _environment;
    }

    [HttpPost]
    //formFile må vi bruke seinere som navn i JS
    public IActionResult PostImage(IFormFile formFile)
    {
        // typ formFile.contentType == image
        string webRootPath = environment.WebRootPath;
        string absolutePath = Path.Combine($"{webRootPath}/images/{formFile.FileName}");

        using (var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            formFile.CopyTo(fileStream);
        }

        return Ok();
    }

}