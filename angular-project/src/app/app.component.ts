import { Component, OnInit } from '@angular/core';
import { HelperService } from './common/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-project';
  flag: boolean= false;
  constructor(private helper: HelperService) {
    
  }
  ngOnInit(): void {
    this.helper.headerFlag.subscribe(res => {
      this.flag = res;
    });
  }
}
