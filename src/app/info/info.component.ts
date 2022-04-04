import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  imageInfo:any ={};

    
  constructor(private httpClient: HttpClient, private router:ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    this.getImageInfo(this.router.snapshot.params["id"]);

  }

  getImageInfo(imageId:string) {
    this.httpClient
      .get<any>(`https://picsum.photos/id/${imageId}/info`)
      .subscribe((response) => {
        console.log(response);
        this.imageInfo = response;
      });
  }
  clickBack(): void {
    this.location.back()
  }
}
