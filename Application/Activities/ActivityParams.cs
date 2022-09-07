using Application.Core;

namespace Application.Activities
{
    public class ActivityParams : PagingParams
    {
        public bool isGoing { get; set; }
        public bool isHost { get; set; }
        public string? searchTerm { get; set; }
        public string? category { get; set; }
        public bool IsDraft { get; set; }
        public DateTime? StartDate { get; set; } 
    }
}