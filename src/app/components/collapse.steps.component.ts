import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
    selector: 'collapse-steps',
    templateUrl: '../views/collapse.steps.component.html',
    styleUrls: ["../styles/steps.scss"]
})

export class CollapseStepsComponent implements OnInit{

    @Input() data: any;
    @Input() cls: string;
    @Input() count: number;

    ngOnInit(){
        $(document).ready(function(){
            $(".card-header a").click(function(){
                $(".card").removeClass("active")
                $(this).parent().parent().addClass("active")
            })
        })
    }
}
