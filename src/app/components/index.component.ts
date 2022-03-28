import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {SEO} from '../data/seo';
import {DOCUMENT} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: '../views/index.component.html',
  styleUrls: [
    '../styles/index.scss',
    '../styles/button.scss',
    '../styles/animate.scss'
  ]
})

export class IndexComponent implements OnInit {
  constructor(
    // tslint:disable-next-line:variable-name
    private titleService: Title, private metaTagService: Meta, private _renderer2: Renderer2,
    // tslint:disable-next-line:variable-name
    @Inject(DOCUMENT) private _document: Document) {
  }

  ngOnInit(): void {
    const video = document.getElementById('main-video') as HTMLVideoElement;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        $('.main-image').hide();
        $('.main-video').show();
      }).catch((error) => {
        $('.main-video').hide();
        $('.main-image').show();
      });
    } else {
      $('.main-image').show();
    }

    this.titleService.setTitle(SEO.home.title);

    this.metaTagService.updateTag({name: 'title', content: SEO.home.title});
    this.metaTagService.updateTag({name: 'description', content: SEO.home.description});
    this.metaTagService.updateTag({name: 'keywords', content: SEO.home.keywords});
    this.metaTagService.updateTag({name: 'og:title', content: SEO.home.title});
    this.metaTagService.updateTag({name: 'og:site_name', content: SEO.home.site_name});
    this.metaTagService.updateTag({name: 'og:url', content: SEO.home.url});
    this.metaTagService.updateTag({name: 'og:description', content: SEO.home.description});
    this.metaTagService.updateTag({name: 'og:type', content: SEO.home.type});
    this.metaTagService.updateTag({name: 'og:image', content: SEO.home.image});
    this.metaTagService.updateTag({name: 'twitter:url', content: SEO.home.url});
    this.metaTagService.updateTag({name: 'twitter:title', content: SEO.home.title});
    this.metaTagService.updateTag({name: 'twitter:description', content: SEO.home.description});
    this.metaTagService.updateTag({name: 'twitter:card', content: 'summary_large_image'});
    this.metaTagService.updateTag({name: 'twitter:image', content: SEO.home.image});


    const script = this._renderer2.createElement('script');
    script.type = `application/ld+json`;
    script.text = SEO.home.ld_json;
    const ls = this._document.getElementById('script-ld');
    ls.innerHTML = '';
    this._renderer2.appendChild(ls, script);
  }
}
