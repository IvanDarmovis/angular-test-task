import { Injectable } from "@angular/core";

interface Coin {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
  }

@Injectable()
export class Api {
    async response() {
        const resp = await (await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).json();
        const coin: Coin[] = resp;
        return coin;
    }
}