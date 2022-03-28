import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private router: Router) {

        if (environment.production) {

            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if (gtag) {
                        gtag('set', 'page_path', event.urlAfterRedirects)
                        gtag('event', 'page_view')
                    }
                }
            })

            const gTagManagerScript = document.createElement('script')
            gTagManagerScript.async = true
            gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.TRACKING_ID}`
            document.head.appendChild(gTagManagerScript)
            const gTagScript = document.createElement('script')
            gTagScript.innerHTML = `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){ dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', '${environment.TRACKING_ID}');
                `
            document.head.appendChild(gTagScript)


            const clarityScript = document.createElement('script')
            clarityScript.innerHTML = `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "aaqbiopnd6");
            `
            document.head.appendChild(clarityScript)
        }

    }

    ngOnInit() {
    }
}
