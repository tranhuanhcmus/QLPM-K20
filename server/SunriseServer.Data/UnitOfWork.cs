using SunriseServerData;
using SunriseServerCore.RepoInterfaces;
using SunriseServerData.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace SunriseServerData
{
    public class UnitOfWork
    {
        readonly DataContext _dataContext;
        public UnitOfWork(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        #region Hotel
        private IHotelRepo _hotelRepo;
        public IHotelRepo HotelRepo
        {
            get
            {
                if (_hotelRepo == null)
                    _hotelRepo = new HotelRepo(_dataContext);
                return _hotelRepo;
            }
        }
        #endregion

        #region Room
        private IHotelRoomServiceRepo _hotelRoomServiceRepo;
        public IHotelRoomServiceRepo HotelRoomServiceRepo
        {
            get
            {
                if (_hotelRoomServiceRepo == null)
                    _hotelRoomServiceRepo = new RoomServiceRepo(_dataContext);
                return _hotelRoomServiceRepo;
            }
        }

        private IHotelRoomFacilityRepo _hotelRoomFacilityRepo;
        public IHotelRoomFacilityRepo HotelRoomFacilityRepo
        {
            get
            {
                if (_hotelRoomFacilityRepo == null)
                    _hotelRoomFacilityRepo = new HotelRoomFacilityRepo(_dataContext);
                return _hotelRoomFacilityRepo;
            }
        }
        #endregion

        #region Account
        private IAccountRepo _accountRepo;
        public IAccountRepo AccountRepo
        {
            get
            {
                if (_accountRepo == null)
                    _accountRepo = new AccountRepo(_dataContext);
                return _accountRepo;
            }
        }
        #endregion

        #region Booking
        private IBookingRepo _bookingRepo;
        public IBookingRepo BookingRepo
        {
            get
            {
                if (_bookingRepo == null)
                    _bookingRepo = new BookingRepo(_dataContext);
                return _bookingRepo;
            }
        }
        #endregion

        public async Task<bool> SaveChangesAsync()
        {
            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var result = await _dataContext.SaveChangesAsync();
                    scope.Complete();
                    return result > 0;
                }
                catch (Exception)
                {
                    scope.Dispose();
                    return false;
                }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns>Error list</returns>
        public List<string> SaveChanges()
        {
            var errors = new List<string>();
            try
            {
                _dataContext.SaveChanges();
                return errors;
            }
            catch(Exception ex)
            {
                var currentEx = ex;
                do
                {
                    errors.Add(currentEx.Message);
                    if (currentEx.InnerException == null)
                        break;
                    currentEx = currentEx.InnerException;
                } while (true);
                return errors;
            }
        }
    }
}
