import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';

import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).then(h => this.hero = h);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save() {
    this.heroService.save(this.hero).then(hero => {
      this.hero = hero;
      this.goBack(hero);
    })
    .catch(error => this.error = error);
  }

  goBack(hero: Hero = null ) {
    this.close.emit(hero); // seems to work when uncommented...?
    if (this.navigated) {
      window.history.back();
    }
  }
};