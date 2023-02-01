import { useTheme } from '@mui/material';
import { ResponsiveChoropleth } from '@nivo/geo'
import {geoData} from "./features";

const MyResponsiveChoropleth = ({ data }) => {
    const theme = useTheme();
   return  <ResponsiveChoropleth
   data={data}
   features={geoData.features}
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
   margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
   colors="nivo"
   domain={[ 0, 60 ]}
   unknownColor="#666666"
   label="properties.name"
   valueFormat=".2s"
   projectionScale={150}
   projectionTranslation={[ 0.45, 0.5 ]}
   projectionRotation={[ 0, 0, 0 ]}
   graticuleLineColor="#dddddd"
   borderWidth={0.5}
   borderColor="#152538"

   legends={[
       {
           anchor: 'bottom-right',
           direction: 'column',
           justify: true,
           translateX: 0,
           translateY: -125,
           itemsSpacing: 0,
           itemWidth: 94,
           itemHeight: 18,
           itemDirection: 'left-to-right',
           itemTextColor: theme.palette.secondary[200],
           itemOpacity: 0.85,
           symbolSize: 18,
           effects: [
               {
                   on: 'hover',
                   style: {
                       itemTextColor: theme.palette.background.alt,
                       itemOpacity: 1
                   }
               }
           ]
       }
   ]}
/>
}

export default MyResponsiveChoropleth;