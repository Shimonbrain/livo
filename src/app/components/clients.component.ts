import { Component } from '@angular/core';
import { clients } from "../data/testimonials";
declare var $:any;

@Component({
    selector: 'app-clients',
    templateUrl: '../views/clients.component.html',
    styleUrls: [
        "../styles/clients.scss"
    ]
})

export class ClientsComponent {
  responsiveOptions = [
      {
        breakpoint: '3000px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      }
      ,
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    testimonials: any;
    ngOnInit(){
        this.testimonials = clients.testimonials;
    }

    wrapText(title: []){
        return title.join(", ");
    }
}
