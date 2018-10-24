import { trigger, state, animate, transition, style, query, animateChild, group } from '@angular/animations';

export const routeAnimations =
    trigger('routeAnimationsTrigger', [
        transition('* <=> *', [
            style({ opacity: 0 }),
            animate('1s', style({ opacity: 1 }))
        ]),
    ]);
