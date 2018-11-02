import { InjectionToken } from '@angular/core';

export let JQUERY_TOKEN = new InjectionToken("jquery");

export function jQueryFactory() {
    return window["jQuery"];
}