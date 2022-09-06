using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }
        
        public DateTime? Date { get; set; }

        public string? Description { get; set; }

        public string? Category { get; set; }

        public string? City { get; set; }

        public string? Venue { get; set; }

        public bool IsDraft { get; set; }

        public bool IsCancelled { get; set; }

        public int CommentCount { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public ICollection<ActivityPhoto> ActivityPhotos { get; set; } = new List<ActivityPhoto>();

    }
}