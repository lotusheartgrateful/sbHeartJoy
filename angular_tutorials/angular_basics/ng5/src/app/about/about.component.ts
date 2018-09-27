import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  goals: any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _data: DataService
    ) {
    this.route.params.subscribe(res => console.log(res.id)); //-- outputs the response id defined in the routing module
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.router.navigate(['']); //-- corresponds to the path right in th Routes array defined in the app-routing-module.ts which is the "Home" [path defined as empty]
  }
}
