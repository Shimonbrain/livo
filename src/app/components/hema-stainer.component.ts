import { Component, OnInit } from '@angular/core';
import { steps_info } from "../data/hema-stainer.steps";
declare var $: any;

@Component({
    selector: 'app-hema-stainer',
    templateUrl: '../views/hema-stainer.component.html',
    styleUrls: [
        "../styles/hema-stainer.scss",
        "../styles/animate.scss"
    ]
})

export class HemaStainerComponent implements OnInit {

    data: any;
    cls: string = "HemaStainer-page"

    pages: Array<string> = [
        'Howitworks'
    ]

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
