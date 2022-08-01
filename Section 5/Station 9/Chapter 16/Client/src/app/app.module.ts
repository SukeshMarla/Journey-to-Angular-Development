import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './Customer/customer.component';
import { LoginComponent } from './Login/login.component';
import { AppRoutes } from './Routes/app.routes';
import { AppConfigService } from './Services/app-config.service';
import { initializeConfig } from './Services/app-initializer';
import { TokenInterceptorService } from './Services/Interceptors/http.interceptor';
import { MultiRndService, MultiRndService2, RND_TOKEN } from './Services/multi-rnd.service';
@NgModule({
  declarations: [AppComponent, CustomerComponent, LoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeConfig, multi: true, deps:[AppConfigService]},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
    // , {provide: "RND_VALUE", useClass: MultiRndService, multi: true},
    // {provide: "RND_VALUE", useClass: MultiRndService2, multi: true},
    , {provide: RND_TOKEN, useClass: MultiRndService, multi: true},
    {provide: RND_TOKEN, useClass: MultiRndService2, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
