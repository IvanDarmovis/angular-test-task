import { Component, OnInit } from '@angular/core';
import { Api } from '../api/api'

interface formData {
  eur: string,
  uah: string,
  usd: string,
}

interface Coin {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
  }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  course: Coin[] | null = null;

  data: formData = {
    eur: '0',
    uah: '0',
    usd: '0',
  }

  coinLeft: string = 'uah';
  coinRight: string = 'eur';

  constructor(private exchange: Api) { }

  ngOnInit(): void {
    this.exchangeData()
  }

  private async exchangeData() {
    const data = await this.exchange.response()
    this.course = data
    console.log(data);
  }

  changeCoin(coin: string, side: string) {
    if (side === 'right')
      this.coinRight = coin;
      else
      this.coinLeft = coin;
  }

  changeAmount(amount: string, side: string) {
    let coin: string = '';
    if (side === 'right')
      coin = this.coinRight;
    else
      coin = this.coinLeft;

    switch (coin) {
      case 'eur':
        this.data.eur = amount;
        const euruah = this.course?.find(el => el.ccy.toLowerCase() === 'eur');
        const eurusd = this.course?.find(el => el.ccy.toLowerCase() === 'usd');
        this.data.uah = (Number(amount) * Number(euruah?.sale)).toFixed(2).toString();
        this.data.usd = (Number(this.data.uah) / Number(eurusd?.sale)).toFixed(2).toString();
        break;
      case 'uah':
        this.data.uah = amount;
        const uaheur = this.course?.find(el => el.ccy.toLowerCase() === 'eur');
        const uahusd = this.course?.find(el => el.ccy.toLowerCase() === 'usd');
        this.data.eur = (Number(amount) / Number(uaheur?.sale)).toFixed(2).toString();
        this.data.usd = (Number(this.data.uah) / Number(uahusd?.sale)).toFixed(2).toString();
        break;
      case 'usd':
        this.data.usd = amount;
        const usdeur = this.course?.find(el => el.ccy.toLowerCase() === 'eur');
        const usduah = this.course?.find(el => el.ccy.toLowerCase() === 'usd');
        this.data.uah = (Number(amount) * Number(usduah?.sale)).toFixed(2).toString();
        this.data.eur = (Number(this.data.uah) / Number(usdeur?.sale)).toFixed(2).toString();
        break;
    }
    console.log(this.data);

  }

}
