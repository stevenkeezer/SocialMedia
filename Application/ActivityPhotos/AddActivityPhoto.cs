using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivityPhotos
{
        public class AddActivityPhoto
    {
        public class Command : IRequest<Result<ActivityPhoto>>
        {
            public IFormFile? File { get; set; }
            public string? Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<ActivityPhoto>>
        {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<ActivityPhoto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var id = Guid.Parse(request.Id);

                var activity = await _context.Activities.Include(a => a.ActivityPhotos).FirstOrDefaultAsync(a => a.Id == id);

                if (activity == null)
                {
                    return null;
                }

                var photoUploadResult = await  _photoAccessor.AddPhoto(request.File);

                var photo = new ActivityPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                
                if (!activity.ActivityPhotos.Any(x => x.IsMainActivityPhoto))
                    photo.IsMainActivityPhoto = true;

                activity.ActivityPhotos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<ActivityPhoto>.Success(photo);
                }

                return Result<ActivityPhoto>.Failure("Failed to add photo");
            }
        }
    }

}