
import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';


const MyResponsiveLine = ({ data, isDashboard, view, type="overview", calender="" }) => {
    const theme = useTheme();

    return <ResponsiveLine
        data={data}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve={calender == "monthly" ? undefined : 'catmullRom'}
        axisTop={null}
        axisRight={null}
        enableArea={isDashboard}
        axisBottom={{
            format: type = "overview" ? (v) => {
                if(isDashboard) return v.slice(0, 3)
                return v;
            } : () => {},
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Month",
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : `Total ${view === 'sales' ? "Revenue" : "Units"} for year`,
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
           (type == "overview" &&  !isDashboard) || type !== "overview" ? [
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -20,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ] : undefined }
    />
    }

export default MyResponsiveLine;