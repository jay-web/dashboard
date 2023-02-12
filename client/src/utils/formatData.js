

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

export const formatDataForDailyOverview = (data, theme, startDate, endDate) => {

    if(!data) return [];

    const {dailyData } = data;   

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
    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
        const formattedDate = new Date(date);
        if(formattedDate >= startDate && formattedDate <= endDate) {
            const splitDate = date.substring(date.indexOf("-") + 1);

            totalSalesLine.data = [
                ...totalSalesLine.data,
                {x : splitDate, y: totalSales }
            ];
    
            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                { x: splitDate, y: totalUnits }
            ]
        }

        

    });

    const formattedData = [totalSalesLine, totalUnitsLine]
    return [formattedData];

}