import type { ICandle, IChartResponse, IPrice } from '@/interfaces'

export async function baseGETRequest(url: string): Promise<any> {
  const response = await fetch(url, {
    method: 'GET',
  });
  const json = await response.json();
  if (json.success) {
    return json
  } else {
    throw json
  }
}

export function formatChartData(data: IChartResponse): ICandle[] {
  const formatData: ICandle[] = [];
  const loopLength: number = data.blocks[data.blocks.length - 1].blockNumber - data.blocks[0].blockNumber;
  let lastBlockNumber: number = data.blocks[0].blockNumber - 1;
  let lastOpen: string = data.poolInfo.startingPrice;
  let lastHigh: string = '';
  let lastLow: string = '';
  let lastClose: string = data.poolInfo.startingPrice;

  let i = 0;
  while (formatData.length - 1 !== loopLength) {
    lastBlockNumber++;
    const prices: IPrice[] = [];
    if (data.blocks[i].blockNumber === lastBlockNumber) {
      let high: number = 0,
        low: number = Infinity;
      lastOpen = lastClose;
      data.blocks[i].prices.forEach((price: IPrice, k: number): void => {
        if (+price.priceAfter > high) {
          lastHigh = price.priceAfter
          high = +price.priceAfter;
        }
        if (+price.priceAfter < low) {
          lastLow = price.priceAfter
          low = +price.priceAfter;
        }
        if (k === data.blocks[i].prices.length - 1) {
          lastClose = price.priceAfter;
        }
        prices.push({
          ...price
        })
      });
      i++;
      formatData.push({
        x: lastBlockNumber + '',
        y: [lastOpen, lastHigh, lastLow, lastClose],
        prices
      });
    } else {
      formatData.push({
        x: lastBlockNumber + '',
        y: [lastClose, lastClose, lastClose, lastClose],
        prices
      });
    }
  }
  return formatData;
}