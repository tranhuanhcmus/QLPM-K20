using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;

namespace SunriseServer.Services.BaseService
{
    public abstract class ServiceBase
    {
        private readonly UnitOfWork _unitOfWork;
        public ServiceBase(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public virtual void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }
    }
}
