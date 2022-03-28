import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { moveSteps } from "../helpers/steps";

@Component({
    selector: 'widget-steps',
    templateUrl: '../views/widget.steps.component.html',
    styleUrls: ["../styles/steps.scss"]
})

export class WidgetStepsComponent implements OnInit{

    @Input() data: any;
    @Input() cls: string;
    @Input() count: number;

    ngOnInit(){
        setTimeout(()=>{
            moveSteps()
        }, 500);
    }
}
