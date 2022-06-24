import {
  ChangeDetectionStrategy,
  Component,
  createNgModuleRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-test-lazy',
  templateUrl: './test-lazy.component.html',
  styleUrls: ['./test-lazy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestLazyComponent implements OnInit {
  // https://github.com/wittyprogramming/lazy-load-component-angular13/tree/master/src/app

  @ViewChild("lazyComponent", {read: ViewContainerRef})
  lazyComponent!: ViewContainerRef;

  constructor(private injector: Injector) { }

  async ngOnInit(): Promise<void> {
    await this.lazyLoad();
  }

  private async lazyLoad() {
    const { TestModule } = await import(/* webpackChunkName: "main.test" */ "../test/test.module");
    const { TestComponent } = await import(/* webpackChunkName: "main.test" */ "../test/test.component");

    const moduleRef = createNgModuleRef(TestModule, this.injector);
    this.lazyComponent.clear();
    this.lazyComponent.createComponent(TestComponent, {ngModuleRef: moduleRef});
  }
}
