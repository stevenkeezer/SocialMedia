using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivityPhotos
{
    public class SetMainActivityPhoto
    {
            public class Command : IRequest<Result<Unit>> 
        {
            public string? Id { get; set; }
            public string? ActivityId { get; set; }
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

                var id = Guid.Parse(request.ActivityId!);

                var activity = await _context.Activities!.Include(a => a.ActivityPhotos).FirstOrDefaultAsync(a => a.Id == id);
              
                if (activity == null)
                {
                    return Result<Unit>.Failure("Could not find activity photo");
                }

                var activityPhoto = activity.ActivityPhotos.FirstOrDefault(x => x.Id == request.Id);
              
                if (activityPhoto == null)
                {
                    return Result<Unit>.Failure("Could not find activity photo");
                }

                var currentMain = activity.ActivityPhotos.FirstOrDefault(x => x.IsMainActivityPhoto);

                if (currentMain != null)
                {
                    currentMain.IsMainActivityPhoto = false;
                }

                activityPhoto.IsMainActivityPhoto = true;

                var success = await _context.SaveChangesAsync() > 0;
              
                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Problem saving changes"); 

            }
        }
    }
}