using System.Text.Json.Serialization;
using Domain;

namespace Application.Profiles
{
    public class UserActivityDto
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public DateTime Date { get; set; }
        public ICollection<ActivityPhoto>? ActivityPhotos { get; set; }

        // Exclude property from Json Serialization
        [JsonIgnore]
        public string? HostUsername { get; set; }
    }
}