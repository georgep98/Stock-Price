import { pricesMock } from './chart.utils';
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
        let avg = computeAveragePrice(chartTimeSeries.length ? this.props.chartTimeSeries : pricesMock);

        return (
            <styled.ChartWrapper>
                <styled.Symbol>
                    {symbol}
                </styled.Symbol>
                {
                    <LineChart width={1500} height={450} data={chartTimeSeries.length ? chartTimeSeries : pricesMock}>
                        <XAxis dataKey='date' />
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

