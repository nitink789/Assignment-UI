import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  chartData: any = {
    "chart": {
      "showLabels": '"0',
      "enableSmartLabels": "0",
      "startingAngle": "0",
      "showPercentValues": "1",
      "decimals": "1",
      "useDataPlotColorForLabels": "1",
      "theme": "fusion"
    },
    "data": []
  };
  data: any = []
  isMobile = /Android|iPhone|iPad/i.test(window.navigator.userAgent);
  displayedColumns: string[] = ['Sl_No', 'Name', 'Username', 'City', 'Pincode', 'Company_Name'];
  tableData: MatTableDataSource<any>;
  percentUser: any = ''
  selectedUser: any = {}

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  ngOnInit() {
    let url = 'https://jsonplaceholder.typicode.com/users'
    this.http.get(url).subscribe(result => {
      if (result) {
        this.data = result
      }
      let pieData = { latgt0: 0, latlt0: 0, lnggt0: 0, lnglt0: 0 }
      let tableData: any = []
      this.percentUser = Math.round((this.data.length / 100) * 100)
      this.data.forEach((user, index) => {
        let rowItem = {
          'Sl_No': index + 1, Name: user.name, Username: user.username, City: user.address.city,
          Pincode: user.address.zipcode, 'Company_Name': user.company.name
        }
        tableData.push(rowItem)
        if (user.address.geo.lat >= 0) {
          pieData.latgt0++
        }
        else {
          pieData.latlt0++
        }

        if (user.address.geo.lng >= 0) {
          pieData.lnggt0++
        }
        else {
          pieData.lnglt0++
        }
      })
      this.tableData = new MatTableDataSource(tableData)
      this.setSelectedUser(0)
      pieData.latgt0++
      this.chartData.data = [{ label: 'Latitude > 0', value: pieData.latgt0 }, { label: 'Latitude < 0', value: pieData.latlt0 },
      { label: 'Longitude > 0', value: pieData.lnggt0 }, { label: 'Longitude < 0', value: pieData.lnglt0 }]
    })
  }

  setSelectedUser(index){
    this.selectedUser = {name:this.data[index].name,username:this.data[index].username,email:this.data[index].email}
  }
}
