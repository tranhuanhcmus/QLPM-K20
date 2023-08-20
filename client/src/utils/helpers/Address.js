export const combineAddress = (address, provinceCity, country) => {
    return address + (provinceCity &&  ', ' + provinceCity) + (country &&  ', ' + country)
}