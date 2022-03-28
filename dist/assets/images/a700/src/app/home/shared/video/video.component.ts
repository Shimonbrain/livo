import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ConfigurationService } from 'src/app/home/services/configuration.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  longSqueezeValue= 0;
  longRestValue = 0
  longRepsValue = 1
  shortSqueezeValue = 0
  shortRestValue = 0
  shortRepsValue = 0
  rkSqueezeValue = 0
  rkRestValue = 0
  rkRepsValue = 0
  seconds : number;

  constructor(private _configServ : ConfigurationService) {
    this._configServ.longSqueezeValue.subscribe(value=>{
      this.longSqueezeValue = value
    })
    this._configServ.longRestValue.subscribe(value=>{
      this.longRestValue = value
    })
    this._configServ.longRepsValue.subscribe(value=>{
      this.longRepsValue = value
    })
    this._configServ.shortSqueezeValue.subscribe(value=>{
      this.shortSqueezeValue = value
    })
    
    this._configServ.shortRestValue.subscribe(value=>{
      this.shortRestValue = value
    })
    this._configServ.shortRepsValue.subscribe(value=>{
      this.shortRepsValue = value
    })
    this._configServ.rkSqueezeValue.subscribe(value=>{
      this.rkSqueezeValue = value
    })
    this._configServ.rkRestValue.subscribe(value=>{
      this.rkRestValue = value
    })
    this._configServ.rkRepsValue.subscribe(value=>{
      this.rkRepsValue = value
    })
   }

//    play(){


//       var border = document.getElementsByTagName("circle");
//       var timer = document.getElementsByClassName("timer");

//      let countdown = this.longRepsValue;
//      let firstRep = countdown;
//      let wait = this.longSqueezeValue;
//      let shortSqueeze = this.longRestValue;

//     startTimer()

//     function startTimer() {
//       console.log('1');
//       if(countdown == firstRep){
//         document.getElementsByTagName("circle")[0].classList.remove("circle1")
//           document.getElementsByTagName("circle")[0].classList.add("circle2")
//           border[0].style.animationDuration = wait+'s';

//           startTimer1();

//           countdown--;
//       }
//       else{
//       var interval = setTimeout(function(){
//         document.getElementsByTagName("circle")[0].classList.remove("circle1")
//         document.getElementsByTagName("circle")[0].classList.add("circle2")
//         border[0].style.animationDuration = wait+'s';


//     border[0].style.animationDuration = wait+'s';
//      if (countdown < 0) {
//        clearInterval(interval);
//       }
//       else{
//         startTimer1();
//       }
//     }, shortSqueeze*1000);
//   }
// }
    
    
//   function startTimer1(){
//     console.log('2');
//     var interval1 = setTimeout(function(){
//          document.getElementsByTagName("circle")[0].classList.remove("circle2")
//          document.getElementsByTagName("circle")[0].classList.add("circle1")

//          border[0].style.animationDuration = shortSqueeze+'s';
//       const radius = Number(border[0].getAttribute('r'));
//      const circumference = -2 * radius * Math.PI;
 
//      border[0].style.animationDuration = shortSqueeze+'s';

//       if (countdown <= 0) {
//         clearInterval(interval1);
//       }
//       else{
//         countdown = countdown - 1;
//         startTimer();
//       }
//   }, wait*1000)
//   }


//       // if(this.playAni){
//       //  border[0].style.animationPlayState = "running"; 
//       //  this.playAni = !this.playAni; 
//       // }
//       // else{
//       //  border[0].style.animationPlayState = "paused";
//       //  this.playAni = !this.playAni;
//       // }

//     // function play2(){
//     //   var border = document.getElementsByTagName("circle");
//     //  var timer = document.getElementsByClassName("timer");
//     //  border[0].style.animationDuration = this.shortSqueezeValue+'s';
//     //  border[0].style.animationIterationCount = String(this.shortRepsValue);
//     //  border[0].style.transitionDelay = this.shortRestValue+'s';
//     // }
  

//    }



firstFunction(){

  var border = document.getElementById("sphere");
  var outer = document.getElementsByTagName("circle");

  let countdown1 = this.shortRepsValue;
  let firstRep = countdown1;
  let wait = this.shortSqueezeValue;
  let shortSqueeze = this.shortRestValue;
  let seconds1
  

startTimer2()

function startTimer2() {
  // console.log('1');

  if(countdown1 == firstRep){
      document.getElementById("sphere").classList.remove("sphere2")
      document.getElementById("sphere").classList.add("sphere1")
      border.style.animationDuration = wait+'s';

      document.getElementsByTagName("circle")[0].classList.remove("circle1")
      document.getElementsByTagName("circle")[0].classList.add("circle2")
      outer[0].style.animationDuration = wait+'s';

      seconds1 = wait;

      function timer(){
          var i = setInterval(function(){

            if (seconds1 <= 0) {
              clearInterval(i);
             }
             else{
               seconds1 = seconds1 - 1;
               console.log(seconds1);
             }
          }, 1000)
      }

      timer()

      startTimer3();
      countdown1--;
  }
  else{
  var interval = setTimeout(function(){
    document.getElementById("sphere").classList.remove("sphere2")
    document.getElementById("sphere").classList.add("sphere1")
    border.style.animationDuration = wait+'s';

    document.getElementsByTagName("circle")[0].classList.remove("circle1")
    document.getElementsByTagName("circle")[0].classList.add("circle2")
    outer[0].style.animationDuration = wait+'s';

 if (countdown1 < 0) {
   clearInterval(interval);
  }
  else{
    startTimer3();
  }
}, shortSqueeze*1000);
}
}


function startTimer3(){
  var interval1 = setTimeout(function(){
  document.getElementById("sphere").classList.remove("sphere1")
  document.getElementById("sphere").classList.add("sphere2")
  border.style.animationDuration = shortSqueeze+'s';

  document.getElementsByTagName("circle")[0].classList.remove("circle2")
  document.getElementsByTagName("circle")[0].classList.add("circle1")

  outer[0].style.animationDuration = shortSqueeze+'s';

  if (countdown1 <= 0) {
    clearInterval(interval1);
  }
  else{
    countdown1 = countdown1 - 1;
    startTimer2();
  }
}, wait*1000)
};
};




secondFunction(){
    
      var border = document.getElementsByTagName("circle");
      var timer = document.getElementsByClassName("timer");

      let countdown = this.longRepsValue;
      let firstRep = countdown;
      let wait = this.longSqueezeValue;
      let shortSqueeze = this.longRestValue;

      startTimer()

function startTimer() {
  // console.log('1');
  if(countdown == firstRep){
    document.getElementsByTagName("circle")[0].classList.remove("circle1")
      document.getElementsByTagName("circle")[0].classList.add("circle2")
      border[0].style.animationDuration = wait+'s';

      startTimer1();

      countdown--;
  }
  else{
  var interval = setTimeout(function(){
    document.getElementsByTagName("circle")[0].classList.remove("circle1")
    document.getElementsByTagName("circle")[0].classList.add("circle2")
    border[0].style.animationDuration = wait+'s';

 if (countdown < 0) {
   clearInterval(interval);
  }
  else{
    startTimer1();
  }
}, shortSqueeze*1000);
}


}


function startTimer1(){
// console.log('2');
var interval1 = setTimeout(function(){
     document.getElementsByTagName("circle")[0].classList.remove("circle2")
     document.getElementsByTagName("circle")[0].classList.add("circle1")

     border[0].style.animationDuration = shortSqueeze+'s';

  if (countdown <= 0) {
    clearInterval(interval1);
  }
  else{
    countdown = countdown - 1;
    startTimer();
  }
}, wait*1000)
}

    setTimeout(()=>{this.firstFunction()},((this.longSqueezeValue+this.longRestValue)*this.longRepsValue)*1000);
};



  ngOnInit(): void {
  }

}
