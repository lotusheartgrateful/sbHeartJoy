import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //-- used for sharing data between components

@Injectable()

export class DataService {

  //-- New BehaviorSubject of type any
  //-- This is where we will set the default values of the goals array
  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);

  //-- Create another property, goal
  goal = this.goals.asObservable();

  constructor() { }

  //-- Custom method: Accessible from other components.
  changeGoal(goal) { //-- Pass in the actual goal
    this.goals.next(goal);
  }
}
