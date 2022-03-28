import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { steps_info } from "../data/a1000.steps";
declare var $: any;

@Component({
    selector: 'app-a1000',
    templateUrl: '../views/a1000.component.html',
    styleUrls: [
        "../styles/a1000.scss",
        "../styles/animate.scss"
    ]
})

export class A1000Component implements OnInit {

    data: any;
    cls: string = "a1000-page"

    pages: Array<string> = [
        'Howitworks'
    ]

    constructor(private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        $(".PD-link2").click(function () {
            var block = $(this).attr("block");
            if (block) {
                $('html, body').animate({
                    scrollTop: $(block).offset().top
                }, 800, function () {
                })
            }
        })
        this.data = steps_info;
    }
}
