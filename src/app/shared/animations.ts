import { animate, animateChild, group, query, state, style, transition, trigger } from "@angular/animations";

    export const slideInAnimation =
/*     trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position:'absolute',
            left:0,
            width:'100%'
          })
    ],{optional:true}),
    query(':enter', [
      style({
        left:'100%',
      })
    ],{optional:true}),
    group([
      query(':enter', [
        animate('400ms ease-out',style({left:'0%'}))
      ],{optional:true}),
      query(':leave', [
        animate('400ms ease-out',style({left:'-100%'}))
      ],{optional:true}),
    ])
  ])]) */
  //slide animation

  trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position:'absolute',
            left:0,
            width:'100%',
            opacity:0,
          })
    ],{optional:true}),
    query(':enter', [
      animate('800ms ease-in',style({opacity:1}))
    ],{optional:true}),
  ])]) 
//fade animation