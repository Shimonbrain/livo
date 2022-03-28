import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { steps_info_for_cbc, steps_info_for_pap } from '../data/a700.steps';
import { SEO } from '../../app/data/seo';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { play } from 'ngx-bootstrap-icons';

declare var $: any;

@Component({
  selector: 'app-a700',
  templateUrl: '../views/a700.component.html',
  styleUrls: ['../styles/global.scss', '../styles/animate.scss'],
})
export class A700Component implements OnInit, OnDestroy, AfterViewInit {
  cls: string = 'livo-page';
  pages: Array<string> = ['Howitworks'];
  videoTimeOut: any;
  videoSlideTimeout: any;

  wbcViewVideo: any;
  rbcViewVideo: any;
  rbcShapeViewVideo: any;
  pltViewVideo: any;
  pltEstViewVideo: any;

  @ViewChild('livo_wbc_video') livo_wbc_video: ElementRef;
  @ViewChild('livo_rbc_video') livo_rbc_video: ElementRef;
  @ViewChild('livo_rbc_shape_video') livo_rbc_shape_video: ElementRef;
  @ViewChild('livo_plt_video') livo_plt_video: ElementRef;
  @ViewChild('livo_plt_est_video') livo_plt_est_video: ElementRef;

  @ViewChild('livo_wbc_video_m') livo_wbc_video_m: ElementRef;
  @ViewChild('livo_rbc_video_m') livo_rbc_video_m: ElementRef;
  @ViewChild('livo_rbc_shape_video_m') livo_rbc_shape_video_m: ElementRef;
  @ViewChild('livo_plt_video_m') livo_plt_video_m: ElementRef;
  @ViewChild('livo_plt_est_video_m') livo_plt_est_video_m: ElementRef;

  pap_data: {
    title: string;
    numbers: number[];
    texts: string[];
    descriptions: string[][];
  };
  cbc_data: {
    title: string;
    numbers: number[];
    texts: string[];
    descriptions: string[][];
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaTagService: Meta,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnDestroy(): void {
    clearTimeout(this.videoSlideTimeout);
    clearTimeout(this.videoTimeOut);
    clearInterval(this.wbcViewVideo);
    clearInterval(this.rbcViewVideo);
    clearInterval(this.rbcShapeViewVideo);
    clearInterval(this.pltViewVideo);
    clearInterval(this.pltEstViewVideo);
  }

  ngOnInit() {
    this.scrollerBtn();
    window['is_wbc_video_playing'] = false;
    window['is_rbc_video_playing'] = false;
    window['is_rbc_shape_video_playing'] = false;
    window['is_plt_video_playing'] = false;
    window['is_plt_est_video_playing'] = false;

    this.loadSEO();
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

    this.cbc_data = steps_info_for_cbc;
    this.pap_data = steps_info_for_pap;

    $('.livo-modules a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      $('#stepsTab li:first-child a').tab('show');
    });

    $(document).ready(function () {
      $('.card-header button').click(function () {
        $('.card-header').removeClass('active');
        $(this).parent().parent().addClass('active');
      });
    });
    let that = this;

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
          }, 9500);

          that.videoTimeOut = setTimeout(function () {
            $('.livo-video-content').show();
          }, 10000);
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

    let script = this._renderer2.createElement('script');
    script.type = `application/ld+json`;
    script.text = SEO.a700.ld_json;
    let ls = this._document.getElementById('script-ld');
    ls.innerHTML = '';
    this._renderer2.appendChild(ls, script);
  }

  ngAfterViewInit() {
    if ($('#livo_wbc_video').is(':visible')) {
      this.wbcViewVideo = setInterval(
        this.isVideoInViewport,
        100,
        this.livo_wbc_video.nativeElement,
        'is_wbc_video_playing'
      );
      this.rbcViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_rbc_video.nativeElement,
        'is_rbc_video_playing'
      );
      this.rbcShapeViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_rbc_shape_video.nativeElement,
        'is_rbc_shape_video_playing'
      );
      this.pltViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_plt_video.nativeElement,
        'is_plt_video_playing'
      );
      this.pltEstViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_plt_est_video.nativeElement,
        'is_plt_est_video_playing'
      );
    }

    if ($('#livo_wbc_video_m').is(':visible')) {
      this.wbcViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_wbc_video_m.nativeElement,
        'is_wbc_video_playing'
      );
      this.rbcViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_rbc_video_m.nativeElement,
        'is_rbc_video_playing'
      );
      this.rbcShapeViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_rbc_shape_video_m.nativeElement,
        'is_rbc_shape_video_playing'
      );
      this.pltViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_plt_video_m.nativeElement,
        'is_plt_video_playing'
      );
      this.pltEstViewVideo = setInterval(
        this.isVideoInViewport,
        1000,
        this.livo_plt_est_video_m.nativeElement,
        'is_plt_est_video_playing'
      );
    }
  }

  loadSEO() {
    this.titleService.setTitle(SEO.a700.title);
    this.metaTagService.updateTag({ name: 'title', content: SEO.a700.title });
    this.metaTagService.updateTag({
      name: 'description',
      content: SEO.a700.description,
    });
    this.metaTagService.updateTag({
      name: 'keywords',
      content: SEO.a700.keywords,
    });
    this.metaTagService.updateTag({
      name: 'og:title',
      content: SEO.a700.title,
    });
    this.metaTagService.updateTag({
      name: 'og:site_name',
      content: SEO.a700.site_name,
    });
    this.metaTagService.updateTag({ name: 'og:url', content: SEO.a700.url });
    this.metaTagService.updateTag({
      name: 'og:description',
      content: SEO.a700.description,
    });
    this.metaTagService.updateTag({ name: 'og:type', content: SEO.a700.type });
    this.metaTagService.updateTag({
      name: 'og:image',
      content: SEO.a700.image,
    });
    this.metaTagService.updateTag({
      name: 'twitter:url',
      content: SEO.a700.url,
    });
    this.metaTagService.updateTag({
      name: 'twitter:title',
      content: SEO.a700.title,
    });
    this.metaTagService.updateTag({
      name: 'twitter:description',
      content: SEO.a700.description,
    });
    this.metaTagService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaTagService.updateTag({
      name: 'twitter:image',
      content: SEO.a700.image,
    });
  }

  isVideoInViewport(element: HTMLVideoElement, playing: string) {
    var bounding = element.getBoundingClientRect();
    if (
      bounding.y >= 0 &&
      bounding.bottom >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      if (!this[playing]) {
        element.play();
        this[playing] = true;
      }
    } else {
      this[playing] = false;
      element.pause();
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
