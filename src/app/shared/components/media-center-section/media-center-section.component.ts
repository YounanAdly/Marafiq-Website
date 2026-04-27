import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-media-center-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './media-center-section.component.html',
  styleUrl: './media-center-section.component.scss',
})
export class MediaCenterSectionComponent {
  public currentLang = 'en';
  private languageService = inject(LanguageService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  @ViewChild('videoPreviewElement') private videoPreviewElementRef?: ElementRef<HTMLVideoElement>;

  isVideoPreviewOpen = false;
  mediaPreviewVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

  readonly mediaNewsItems = [
    {
      imageSrc: 'assets/images/media-news-1.png',
      imageAltKey: 'home.mediaCenter.cards.newsOne.imageAlt',
      openPreviewLabelKey: 'home.mediaCenter.cards.newsOne.openPreview',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      imageSrc: 'assets/images/media-news-2.png',
      imageAltKey: 'home.mediaCenter.cards.newsTwo.imageAlt',
      openPreviewLabelKey: 'home.mediaCenter.cards.newsTwo.openPreview',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      imageSrc: 'assets/images/media-news-3.png',
      imageAltKey: 'home.mediaCenter.cards.newsThree.imageAlt',
      openPreviewLabelKey: 'home.mediaCenter.cards.newsThree.openPreview',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ];

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage() || 'en';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  onViewMoreMediaCenter(): void {
    void this.router.navigate(['/', this.currentLang, 'contact-us']);
  }

  openVideoPreview(videoUrl?: string): void {
    if (videoUrl) {
      this.mediaPreviewVideoUrl = videoUrl;
    }
    this.isVideoPreviewOpen = true;
  }

  closeVideoPreview(): void {
    const player = this.videoPreviewElementRef?.nativeElement;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
    this.isVideoPreviewOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isVideoPreviewOpen) {
      this.closeVideoPreview();
    }
  }
}
