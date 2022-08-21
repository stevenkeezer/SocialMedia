using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);
            await Clients.Group(command.ActivityId.ToString()).SendAsync("ReceiveComment", comment.Value);
        }


        public async Task Edit(string activityId, string id, string body)
        {
            var comment = await _mediator.Send(new Edit.Command { Id = id, Body = body });
            await Clients.Group(activityId).SendAsync("ReceiveDelete", id);
        } 

        public async Task DeleteComment(string commentId, string activityId)
        {
            var command = new Delete.Command { Id = commentId, ActivityId = activityId };
            var result = await _mediator.Send(command);
            if (result != null)
            {
                await Clients.Group(activityId).SendAsync("ReceiveDelete", commentId);
            }
        }
     
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}