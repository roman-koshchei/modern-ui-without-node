
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

const string STATIC_DIR = "wwwroot";

app.MapGet("/", async (HttpResponse res) =>
{
    res.ContentType = "text/html";
    var file = Path.Combine(STATIC_DIR, "index.html");
    await res.SendFileAsync(file);
});

app.MapGet("/{*path}", async ([FromRoute] string path, HttpResponse res) =>
{
    var directPageFile = Path.Combine(STATIC_DIR, $"{path.Trim('/')}.html");
    // Console.WriteLine(directPageFile);

    string? pageFile = null;
    // Console.WriteLine(Path.GetFullPath(directPageFile));
    if (File.Exists(directPageFile))
    {
        pageFile = directPageFile;
    }
    else
    {
        var indexPageFile = Path.Combine(STATIC_DIR, path.Trim('/'), "index.html");
        if (File.Exists(indexPageFile))
        {
            pageFile = indexPageFile;
        }
    }

    if (pageFile is not null)
    {
        res.ContentType = "text/html";
        await res.SendFileAsync(pageFile);
    }
    else
    {
        res.StatusCode = 404;
    }
});

app.MapGet("/api/single/{id}", (string id) =>
{
    return Results.Json(new
    {
        Id = id,
        Name = $"name-{id}",
        Day = DateTime.Now.Day
    });
});

app.Run();