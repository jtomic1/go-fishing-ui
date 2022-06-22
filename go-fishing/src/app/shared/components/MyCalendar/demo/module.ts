import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT,
} from 'angular-calendar';
import * as dayjs from 'dayjs';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';

export function dayjsAdapterFactory() {
  return adapterFactory(dayjs);
}

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      }
    ),
    DemoUtilsModule,
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
  providers: [
    {
      provide: MOMENT,
      useValue: dayjs,
    },
  ],
})
export class DemoModule {}
