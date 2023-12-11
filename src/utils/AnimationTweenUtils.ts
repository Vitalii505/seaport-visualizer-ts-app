import * as TWEEN from '@tweenjs/tween.js';

export class AnimationTweenUtils {

    static isComeTo(object: any, properties: any, duration: number): TWEEN.Tween<any> {
      return new TWEEN.Tween(object)
      .to(properties, duration)
  }
  
    static isOutFrom(object: any, properties: any, duration: number, delay: number): TWEEN.Tween<any> {
      return new TWEEN.Tween(object)
      .to(properties, duration)
      .delay(delay)
      .start()
    }
    
  static update(): void { 
    TWEEN.update();
  }
};