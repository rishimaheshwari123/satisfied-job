import React from 'react';
import { BarChart, Grid } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

const BarChartExample = () => {

    const data = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
        .map((value, index) => ({
            value,
            svg: { fill: 'rgb(134, 65, 244)' },
            key: `bar-${index}`,
        }));

    return (
        <BarChart
            style={{ height: 200 }}
            data={data}
            yAccessor={({ item }) => item.value}
            scale={scale.scaleSymlog}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.2}
            gridMin={0}
        >
            <Grid />
        </BarChart>
    );
};

export default BarChartExample;
