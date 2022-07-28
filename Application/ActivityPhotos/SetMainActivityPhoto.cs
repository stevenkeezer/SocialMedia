using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.ActivityPhotos
{
    public class SetMainActivityPhoto
    {
            public class Command : IRequest<Result<Unit>> 
        {
            public string Id { get; set; }
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
               // find photo by id and set isActivityMainPhoto to true  
                var activityPhoto = await _context.ActivityPhotos.FindAsync(request.Id);
                if (activityPhoto == null)
                {
                    return Result<Unit>.Failure("Could not find activity photo");
                }

                var currentMain = _context.ActivityPhotos.FirstOrDefault(x => x.IsMainActivityPhoto);

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