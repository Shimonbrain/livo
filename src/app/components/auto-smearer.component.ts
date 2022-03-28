import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-auto-smearer',
  templateUrl: '../views/auto-smearer.component.html',
  styleUrls: ['../styles/global.scss', '../styles/animate.scss'],
})
export class AutoSmearerComponent implements OnInit, OnDestroy {
  cls: string = 'livo-page';
  pages: Array<string> = ['Howitworks'];
  videoTimeOut: any;
  videoSlideTimeout: any;

  ngOnDestroy(): void {
    clearTimeout(this.videoSlideTimeout);
    clearTimeout(this.videoTimeOut);
  }

  ngOnInit() {
    this.scrollerBtn();
    let that = this;
    $('.PD-link2').click(function () {
      var block = $(this).attr('block');
      if (block) {
        $('html, body').animate(
          {
            scrollTop: $(block).offset().top,
          },
          800,
          function () {}
        );
      }
    });

    let video = <HTMLVideoElement>document.getElementById('livo-video');
    $('.loader').show();

    let playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          $('.livo-video-content').hide();
          $('.livo-image').hide();
          $('.loader').hide();
          $('.livo-video').show();
        })
        .then(function () {
          that.videoSlideTimeout = setTimeout(function () { 
            $('.livo-video').addClass('slide');
          }, 5500);

          that.videoTimeOut = setTimeout(function () {
            $('.livo-video-content').show();
          }, 6000);
        })
        .catch((error) => {
          $('.loader').hide();
          $('.livo-video-content').show();
          $('.livo-image').show();
        });
    } else {
      $('.loader').hide();
      $('.livo-video-content').show();
      $('.livo-image').show();
    }
  }

  scrollerBtn() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      const fromTop = window.scrollY + 200;
      const currentScrollPos = window.pageYOffset;
      if (window.pageYOffset > 50) {
        document.getElementById('contact-test').classList.remove('d-none');
        document.getElementById('contact-test1').classList.remove('d-none');
        prevScrollpos = currentScrollPos;
      } else {
        document.getElementById('contact-test').classList.add('d-none');
        document.getElementById('contact-test1').classList.add('d-none');
      }
    };
  }
}
