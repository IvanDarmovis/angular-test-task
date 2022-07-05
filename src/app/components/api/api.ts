import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Api implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  response() {
    return this.http.get(
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
    );
  }
}
