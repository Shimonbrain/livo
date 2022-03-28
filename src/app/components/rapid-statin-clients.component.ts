import { Component } from '@angular/core';

@Component({
    selector: 'app-rapid-stain-clients',
    templateUrl: '../views/rapid-stain-clients.component.html',
    styleUrls: [
        "../styles/rapid-stain-clients.scss"
    ]
})

export class RapidStainClientsComponent {

    clients_logos = [[{
        src: "./assets/images/rapid-stain-clients/elbit.png"
    },{
        src: "./assets/images/rapid-stain-clients/srisriholistic.png"
    }, {
        src: "./assets/images/rapid-stain-clients/carehospitals.svg"
    }, {
        src: "./assets/images/rapid-stain-clients/zoi.png"
    }], [{
        src: "./assets/images/rapid-stain-clients/muslimmaternity.svg"
    }, {
        src: "./assets/images/rapid-stain-clients/shreekrishna.png"
    }, {
        src: "./assets/images/rapid-stain-clients/yeslabs.svg"
    }, {
        src: "./assets/images/rapid-stain-clients/deccan.svg"
    }, {
        src: "./assets/images/rapid-stain-clients/bhaskara.svg"
    }]]

}
