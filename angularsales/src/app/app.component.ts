import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularsales';
  data: any;
  ngOnInit(): void {
    this.utcTime()
  }

  utcTime(): void {
    setInterval( () => {
      this.data = new Date();
    }, 1);
  }

}
