using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>> 
        {          
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
        
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {


               var query = _context.Activities
                    .Where(x => x.IsDraft == true)
                    .OrderBy(x => x.CreatedAt)
                    .Union(_context.Activities.Where(x => x.IsDraft == false))
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();

                if (request.Params.StartDate != null) {
                    query = _context.Activities
                    .Where(d =>  d.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();
                } 


                if (request.Params.isGoing && !request.Params.isHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUsername()));
                }

                if (request.Params.isHost && !request.Params.isGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                if (request.Params.StartDate != null)
                {
                    query = query.Where(x => x.Date >= request.Params.StartDate);
                }

                if (request.Params.searchTerm != null)
                {
                    query = query.Where(x => x.Title.ToLower().Contains(request.Params.searchTerm.ToLower()) ||
                                             x.Description.ToLower().Contains(request.Params.searchTerm.ToLower()) ||
                                             x.HostUsername.ToLower().Contains(request.Params.searchTerm.ToLower()));
                }

                if (request.Params.category != null)
                {
                    query = query.Where(x => x.Category.ToLower().Contains(request.Params.category.ToLower()) ||
                                             x.Title.ToLower().Contains(request.Params.category.ToLower()));
                }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}