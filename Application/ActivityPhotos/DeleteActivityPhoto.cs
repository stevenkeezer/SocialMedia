using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivityPhotos
{
    public class DeleteActivityPhoto
    {
         public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public string ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
        
            {
            _photoAccessor = photoAccessor;
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityPhoto = await _context.ActivityPhotos.FindAsync(request.Id);
                if (activityPhoto == null)
                {
                    return Result<Unit>.Failure("Could not find activity photo");
                }

                var result = _photoAccessor.DeletePhoto(activityPhoto.Id);
                if (result == null)
                {
                    return Result<Unit>.Failure("Problem deleting photo");
                }

  
                if (activityPhoto.IsMainActivityPhoto)
                {
                    var activity = await _context.Activities.Include(a => a.ActivityPhotos).FirstOrDefaultAsync(a => a.Id == Guid.Parse(request.ActivityId));
                    if (activity == null) return null;

                    if (activity.ActivityPhotos.Count() == 1)
                    {   
                        activity.ActivityPhotos.FirstOrDefault().IsMainActivityPhoto = true;
                    }
                    else
                    {
                        var newMain = activity.ActivityPhotos.FirstOrDefault(x => x.IsMainActivityPhoto == false);
                        newMain.IsMainActivityPhoto = true;
                    }
                }
              
                _context.ActivityPhotos.Remove(activityPhoto);
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