import { computeAveragePrice, EasyTimeSeries } from '../../utils/utils';
import * as React from 'react';
import {
    CartesianGrid,
    Label,
    Line,
    LineChart,
    ReferenceLine,
    Tooltip,
    XAxis,
    YAxis
    } from 'recharts';
let styled = require('./chart.style');

interface Props {
    chartTimeSeries: EasyTimeSeries[];
    symbol: string;
}

interface State { }

export class Chart extends React.Component<Props, State> {

    constructor(props: Props) {

        super(props);

        this.state = {};
    }


    public render() {
        const { chartTimeSeries, symbol } = this.props;
        let avg = computeAveragePrice(chartTimeSeries);

        return (
            <styled.ChartWrapper>
                <styled.Symbol>
                    {chartTimeSeries.length ? symbol : 'No Records!'}
                </styled.Symbol>
                {
                    <LineChart width={1700} height={450} data={chartTimeSeries}>
                        <XAxis dataKey='date' interval='preserveStartEnd' domain={['auto',new Date().toString()]}/>
                        <YAxis dataKey='price' />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="price" stroke="blue" />
                        <Tooltip />
                        <ReferenceLine y={avg} stroke="black" strokeDasharray='5 10'>
                            <Label value={`avg: ${(avg).toFixed(2)}`} position='insideLeft' fill='brown' fontWeight='bold' />
                        </ReferenceLine>
                    </LineChart>
                }
            </styled.ChartWrapper>

        )
    }
}

