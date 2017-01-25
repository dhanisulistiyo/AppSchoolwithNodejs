using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppSchoolSystem.Controllers
{
    public class StudentsController : Controller
    {
        // GET: Students
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return PartialView("Create");
        }

        public ActionResult Details()
        {
            return PartialView("Details");
        }




    }
}
