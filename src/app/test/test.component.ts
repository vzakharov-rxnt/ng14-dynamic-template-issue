import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
}
