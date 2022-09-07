using Domain;

namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }
        
        public DateTime Date { get; set; }

        public string? Description { get; set; }

        public string? Category { get; set; }

        public string? City { get; set; }

        public string? Venue { get; set; }

        public bool IsDraft { get; set; }

        public DateTime CreatedAt { get; set; } 
        
        public DateTime UpdatedAt { get; set; }

        public int CommentCount { get; set; }

        public string? HostUsername { get; set; }

        public bool IsCancelled { get; set; }

        public ICollection<AttendeeDto>? Attendees { get; set; }

        public ICollection<ActivityPhoto>? ActivityPhotos { get; set; }

    }
}