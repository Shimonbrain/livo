import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/home/services/header.service';
import SlimSelect from 'slim-select';
import { ConfigurationService } from 'src/app/home/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  
  exercises = ["Beginner", "Intermediate", "Advance", "Quick"]
  selectedExercise = "Beginner"
  values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
  longSqueezeValue = 0;
  longRestValue = 0
  longRepsValue = 0
  shortSqueezeValue = 0
  shortRestValue = 0
  shortRepsValue = 0
  rkSqueezeValue = 0
  rkRestValue = 0
  rkRepsValue = 0
  reverseKegelActive = true;

  changeExercise(name){
    this.selectedExercise = name;
  }

  changeValue(interval, value){
    switch(interval){
      case 1: this.longSqueezeValue = value; this._configServ.longSqueezeValue.next(this.longSqueezeValue); break;
      case 2: this.longRestValue = value; this._configServ.longRestValue.next(this.longRestValue); break;
      case 3: this.longRepsValue = value; this._configServ.longRepsValue.next(this.longRepsValue); break;
      case 4: this.shortSqueezeValue = value; this._configServ.shortSqueezeValue.next(this.shortSqueezeValue); break;
      case 5: this.shortRestValue = value; this._configServ.shortRestValue.next(this.shortRestValue); break;
      case 6: this.shortRepsValue = value; this._configServ.shortRepsValue.next(this.shortRepsValue); break;
      case 7: this.rkSqueezeValue = value; this._configServ.rkSqueezeValue.next(this.rkSqueezeValue); break;
      case 8: this.rkRestValue = value; this._configServ.rkRestValue.next(this.rkRestValue); break;
      case 9: this.rkRepsValue = value; this._configServ.rkRepsValue.next(this.rkRepsValue); break;
    };
  }

  reverseKegel(){
    this.reverseKegelActive = !this.reverseKegelActive;
  }

  constructor(private _headerServ : HeaderService, private _configServ : ConfigurationService) {
   }

  ngOnInit(): void {
  }

}
