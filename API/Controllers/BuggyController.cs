using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("notfound")]

        public ActionResult GetNotFound() 
        {
            return NotFound();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {

            throw new Exception("This is a test exception");
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("this is a bad request");
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
    }
}