import { Component, ViewChild } from '@angular/core';
import { EventSettingsModel, ExportFieldInfo, ExportOptions, ScheduleComponent, ToolbarActionArgs } from '@syncfusion/ej2-angular-schedule';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { scheduleData } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangularproject';
  @ViewChild('scheduler') schedulerObj !: ScheduleComponent;
  public selectedDate: Date = new Date(2023, 9, 9);
  public eventSettings: EventSettingsModel = { dataSource: scheduleData };

  public onActionBegin(args: ToolbarActionArgs){
    if(args.requestType === 'toolbarItemRendering'){
      let exportItem: ItemModel = {
        text: 'Excel Export',
        prefixIcon: 'e-icon-schedule-excel-export',
        click: this.onExportClick.bind(this)
      };
      args.items?.push(exportItem);
    }
  }

  public onExportClick(){
    let customFields: ExportFieldInfo[] = [
      { name:'Subject', text:'Summary'},
      { name: 'StartTime', text: 'First Date' },
      { name: 'EndTime', text: 'Last Date' },
    ]
    let options: ExportOptions = {
      fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'Location'],
      fieldsInfo: customFields,
      fileName: 'Appointments',
      includeOccurrences: false,
      exportType: 'csv',
      customData: [
        {Id: 1, Subject: 'Scrum Meeting',  StartTime: new Date(2019, 0, 6, 9, 30), EndTime: new Date(2019, 0, 6, 11, 0)}, 
        {Id: 2, Subject: 'PO Meeting',  StartTime: new Date(2019, 0, 7, 9, 30), EndTime: new Date(2019, 0, 7, 11, 0)}, 
        {Id: 3, Subject: 'Lead Training',  StartTime: new Date(2019, 0, 8, 9, 30), EndTime: new Date(2019, 0, 8, 11, 0)}]
    }
    this.schedulerObj.exportToExcel(options);
  }
}
