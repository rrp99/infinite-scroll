import { Component, OnInit,HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
export class Image {
  constructor
  (
    public id: string,
    public author: string,
    public width: string,
    public height: string,
    public url: string,
    public download_url: string
  ) {}
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  image: Image[] = [];
  currentPage: number = 1;
  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getImage(this.currentPage);
  }
  getImage(page: number) {
    let limit: number = 6;
    let url=`https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    this.httpClient.get<any>(url).subscribe((response: any) => {
          console.log("response",response);
          this.image.push(...response);
        });
  }

  imageInfo(pageName: any, id: any): void {
    this.router.navigate([`${pageName}${id}`]);
    console.log('click');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event:any){
  
    let scrollHeight = event.target.scrollingElement.scrollHeight;
    let scrollTop = event.target.scrollingElement.scrollTop;
    let clientHeight = event.target.scrollingElement.clientHeight;

    let scrollPosition = scrollHeight - (scrollTop + clientHeight);
    if(scrollPosition == 0 ){
      this.currentPage++;
      this.getImage(this.currentPage);
    }
  }


}
