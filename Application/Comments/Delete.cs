using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
       public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public string ActivityId { get; set; }
        }

   
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var id = int.Parse(request.Id);
                var comment = await _context.Comments.FindAsync(id);

                if (comment == null) return null;

                var activityId = Guid.Parse(request.ActivityId);
                var activity = await _context.Activities.FindAsync(activityId);
                
                if (activity == null) return null;

                if (activity.CommentCount != 0)
                {
                    activity.CommentCount--;
                }

                _context.Comments.Remove(comment);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete comment");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}