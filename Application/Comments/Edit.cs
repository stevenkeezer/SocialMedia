using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string? Id { get; set; }
            public string? Body { get; set; }
        }

        public class Handler :IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var comment = await _context.Comments!.FindAsync(int.Parse(request.Id!));
               
                if (comment == null) return null!;

                comment.Body = request.Body;
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Failed to update comment");
            }
        }
    }
}