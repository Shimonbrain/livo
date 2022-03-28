import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  longSqueezeValue = new BehaviorSubject(0);
  longRestValue = new BehaviorSubject(0);
  longRepsValue = new BehaviorSubject(0);
  shortSqueezeValue = new BehaviorSubject(0);
  shortRestValue = new BehaviorSubject(0);
  shortRepsValue = new BehaviorSubject(0);
  rkSqueezeValue = new BehaviorSubject(0);
  rkRestValue = new BehaviorSubject(0);
  rkRepsValue = new BehaviorSubject(0);

  constructor() { }
}
