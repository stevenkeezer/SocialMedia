using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityPhoto
    {
        public string? Id { get; set; }

        public string? Url { get; set; }

        public string? FileName { get; set; }

        public string? Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public bool IsMainActivityPhoto { get; set; }
    }
}