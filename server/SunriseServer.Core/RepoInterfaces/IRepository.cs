using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IRepository<TModel> where TModel : ModelBase
    {
        IQueryable<TModel> Query { get; }

        TModel GetById(int id);
        Task<TModel> GetByIdAsync(int id);

        TModel GetById(Expression<Func<TModel, bool>> predicate);
        Task<TModel> GetByIdAsync(Expression<Func<TModel, bool>> predicate);

        IEnumerable<TModel> GetAll();
        Task<IEnumerable<TModel>> GetAllAsync();


        TModel Create(TModel entity);
        Task<TModel> CreateAsync(TModel entity);

        TModel Update(TModel entity);
        Task<TModel> UpdateAsync(TModel entity);

        TModel Delete(int id);
    }
}
