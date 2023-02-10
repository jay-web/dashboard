

export const formatDataForOverview = (data, theme) => {
    if(!data) return [];

    const {monthlyData } = data;       
    // ? Format data as per @nevo/line chart requirement 
    const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: []
    }
     // ? Format data as per @nevo/line chart requirement 
    const totalUnitsLine = {
        id: "totalUnits",
        color: theme.palette.secondary[600],
        data: [],
    }

    // ? Iterate and add up the sales and units with previous months
    Object.values(monthlyData).reduce(
        (acc, {month, totalSales, totalUnits }) => {
            const accumultedSales = acc.sales + totalSales;
            const accumultedUnits = acc.units + totalUnits;

            totalSalesLine.data = [
                ...totalSalesLine.data,
                {x : month, y: accumultedSales }
            ];

            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                { x: month, y: accumultedUnits}
            ]

            return { sales: accumultedSales, units: accumultedUnits }
        },{sales: 0, units: 0}
    )

    return [[totalSalesLine], [totalUnitsLine]];
}