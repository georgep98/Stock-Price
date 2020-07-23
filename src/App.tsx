import { EasyTimeSeries } from './utils/utils';
import { Button } from '../src/components/button/button';
import { Chart } from '../src/components/chart/chart';
import { StyledInput } from '../src/components/input/input';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
let styled = require('./App.style');
let utils = require('./utils/utils')


interface Props { }

interface State {
  inputValue: string;
  startDate: Date;
  endDate: Date;
  filteredSeries: EasyTimeSeries[];
  symbol: string;
}

export class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: '',
      startDate: new Date("1999-12-31"),
      endDate: new Date(),
      filteredSeries: [],
      symbol: 'AMZN',
    }
  }

  public render() {
    const { filteredSeries, startDate, endDate, inputValue } = this.state;

    return (
      <styled.App>
        <StyledInput onChange={(e: any) => this.handleInputChange(e)} />
        <Button onClick={() => this.callVantageApi()} text={'Fetch Stock Values'} />
        <Chart
          symbol={!!inputValue ? inputValue : 'Amzn'}
          chartTimeSeries={filteredSeries} />

        <styled.Calendars>
          <Calendar
            minDate={new Date("1999-12-31")}
            maxDate={new Date()}
            onChange={(date) => this.onChangeCalendarStartDate(date)}
            value={startDate}
          />

          <Calendar
            minDate={new Date("1999-12-31")}
            maxDate={new Date()}
            onChange={(date) => this.onChangeCalendarEndDate(date)}
            value={endDate}
          />

          <Button onClick={() => this.sliceDate()} text={'Slice Dates'} />

        </styled.Calendars>

      </styled.App>
    )
  }

  public componentDidMount() {
    let request = utils.createAlphaVantageRequestInfo('amzn');

    fetch(request)
      .then(
        (res) => {
          return res.json();
        }
      )
      .then(
        (data) => {
          if (data['Error Message']) {
            console.warn('<!> Error')
            return;
          }
          this.setState({
            filteredSeries: utils.convertTimeSeries(data),
          });
          this.sliceDate()
        }
        
      )
  }

  private sliceDate() {
    let { startDate, endDate, filteredSeries } = this.state;
    let start: any, end: any;

    if(startDate >= endDate) {
      start = endDate;
      end = startDate
    
    } else {
      start = startDate;
      end = endDate;
    }


    let copyChartTimeSeries = filteredSeries;
    copyChartTimeSeries = copyChartTimeSeries.filter(timeSeries => new Date(timeSeries.date) >= start && new Date(timeSeries.date) <= end)

    let newChartTimes = [
      { date: start.getDate() + "-" + (start.getMonth() + 1) + "-" + start.getFullYear(),
        price: copyChartTimeSeries[0].price,
      },
         ...copyChartTimeSeries,
      {
        date: end.getDate() + "-" + (end.getMonth() + 1) + "-" + end.getFullYear(),
        price: copyChartTimeSeries[copyChartTimeSeries.length - 1].price
      }  
        ]

    this.setState({
      filteredSeries: newChartTimes,
    })
  }

  private onChangeCalendarStartDate(date: any) {
    this.setState({
      startDate: date
    })
  }

  private onChangeCalendarEndDate(date: any) {
    this.setState({
      endDate: date
    })
  }

  private handleInputChange(e: any) {
    this.setState({
      inputValue: e.target.value,
    })
  }

  private callVantageApi() {
    const { inputValue } = this.state;
    let stockSymbol = inputValue;

    let request = utils.createAlphaVantageRequestInfo(stockSymbol);

    fetch(request)
      .then(
        (res) => {
          return res.json();
        }
      )
      .then(
        (data) => {
          if (data['Error Message']) {
            console.warn('<!> Error')
            return;
          }
          this.setState({
            filteredSeries: utils.convertTimeSeries(data),
          });
          this.sliceDate()
        }

      )
  }

}

export default App;
