using SunriseServer.Common.Helper;
using SunriseServerCore.Dtos.Order;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System.Text;
using SunriseServerCore.Dtos.Product;

namespace SunriseServerData.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        readonly DataContext _dataContext;

        public OrderRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // public async Task<int> GetNextOrderIdAsync()
        // {
        //     var result = await _dataContext.Set<MyProcedureResult>()
        //         .FromSqlInterpolated($"DECLARE @Id INT; EXEC @Id = USP_GetNextColumnId 'Orders', 'OrderId'; SELECT @Id").ToListAsync();

        //     return (result.FirstOrDefault()).MyValue;
        // }

        public async Task<int> AddOrderAsync(int accountId, GetOrderDto order)
        {
            var builder = new StringBuilder("DECLARE @Id INT;\nEXEC @Id = USP_CreateOrder ");
            builder.Append($"@AccountId={accountId}, ");
            builder.Append($"@PaymentMethod=\'MONEY\', ");
            builder.Append($"@TimeOrder=\'{DateTime.Now.ToString("yyyy-MM-dd")}\', ");
            builder.Append($"@TimeDone=\'{DateTime.Now.ToString("yyyy-MM-dd")}\', ");
            builder.Append($"@Status=\'UNDONE\', ");
            builder.Append($"@Address=N\'{order.Address ?? "Tp Hồ Chí Minh"}\';\n");
            builder.Append($"SELECT @Id;");

            Console.WriteLine(builder.ToString());

            var order_info = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
            var orderId = order_info.FirstOrDefault()?.MyValue;
            
            if (orderId is null || orderId < 0)
                return -1;

            var execString = new StringBuilder();
            order.OrderItem.ForEach(item => {
                execString.Append($"EXEC USP_AddProdToOrder {orderId}, {item.Item.Id}, {item.Quantity};\n");
            });
            var result = await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({execString.ToString()});");

            return result;
        }

        public async Task<List<OrderDetail>> GetOrderItemByIdAsync(int orderId)
        {
            var OrderItem = await _dataContext.Set<OrderDetail>()
                .FromSqlInterpolated($"EXEC USP_GetOrderDetailById @OrderId={orderId}").ToListAsync();

            return OrderItem;
        }

        public async Task<Order> GetOrderInfoByIdAsync(int orderId)
        {
            var rawOrder = await _dataContext.Set<Order>()
                    .FromSqlInterpolated($"EXEC USP_GetOrderById @OrderId={orderId}")
                    .ToListAsync();

            return rawOrder.FirstOrDefault();
        }

        public async Task<List<GetOrderDto>> GetAccountOrderByIdAsync(int accountId)
        {
            var orderList = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"SELECT OrderId FROM Orders WHERE customer={accountId};").ToListAsync();

            var result = new List<GetOrderDto>();
            foreach (var id in orderList)
            {
                var temp = new GetOrderDto();
                SetPropValueByReflection.AddYToX(temp, await GetOrderInfoByIdAsync(id.MyValue));
                result.Add(temp);
            }

            return result;
        }

        public async Task<List<int>> GetOrdersAsync()
        {
            var orderList = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"SELECT OrderId FROM Orders;").ToListAsync();

            return orderList.Select(x => x.MyValue).ToList();
        }

        public async Task<int> UpdateOrderUserAsync(int accountId, GetOrderDto orderDto)
        {
            var builder = new StringBuilder("EXEC USP_UpdateOrderUser ");
            builder.Append($"@OrderId={orderDto.OrderId}, ");
            builder.Append($"@AccountId={accountId}, ");
            builder.Append($"@Address=\'{orderDto.Address}\', ");
            builder.Append($"@PaymentMethod=\'{orderDto.PaymentMethod}\';");

            Console.WriteLine(builder.ToString());

            var order_info = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
            var orderId = order_info.FirstOrDefault()?.MyValue;

            var execString = new StringBuilder();
            orderDto.OrderItem.ForEach(item => {
                execString.Append($"EXEC USP_AddProdToOrder {orderDto.OrderId}, {item.Item.Id}, {item.Quantity};\n");
            });
            var result = await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({execString.ToString()});");

            return result;
        }

        public async Task<int> DeleteOrderAsync(int accountId, int orderId)
        {
            return await _dataContext.Database
                .ExecuteSqlInterpolatedAsync($"EXEC DeleteOrder @AccountId={accountId}, @OrderId={orderId};");
        }
    }
}
