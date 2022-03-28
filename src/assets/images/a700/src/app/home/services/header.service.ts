import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() {
  }
  
  subject = new BehaviorSubject("");
  img = new BehaviorSubject("");
}
