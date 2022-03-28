import { Component, OnInit } from '@angular/core';
import { vacancies } from "../data/careers.open-positions";

@Component({
    selector: 'app-careers',
    templateUrl: '../views/careers.component.html',
    styleUrls: ["../styles/careers.scss"]
})

export class CareersComponent implements OnInit {
    vacancies: { title: string; experience: string; description: string[]; }[];
    ngOnInit() {
        this.vacancies = vacancies;
    }
}
