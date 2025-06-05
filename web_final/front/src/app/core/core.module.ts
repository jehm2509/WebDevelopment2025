import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@/core/interceptors/AuthInterceptor';

@NgModule({
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded. Please only import in appmodule');
    }
  }
}
