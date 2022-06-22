import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartpagePreviewListService } from './startpage-preview-list.service';

@Component({
  selector: 'app-startpage-preview-list',
  templateUrl: './startpage-preview-list.component.html',
  styleUrls: ['./startpage-preview-list.component.css'],
})
export class StartpagePreviewListComponent implements OnInit {
  boatList: any;
  cottageList: any;
  adventureList: any;

  form: FormGroup = this.createSearchControl();

  constructor(
    private previewListService: StartpagePreviewListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeBoatList();
    this.subscribeCottageList();
    this.subscribeAdventureList();
    let searchControl = this.form.controls['searchBar'];
    searchControl.valueChanges.subscribe(() => {
      if (searchControl.value === '') {
        this.subscribeBoatList();
        this.subscribeCottageList();
        this.subscribeAdventureList();
      } else {
        if (searchControl.valid) {
          this.subscribeBoatListParam(searchControl.value);
          this.subscribeCottageListParam(searchControl.value);
          this.subscribeAdventureListParam(searchControl.value);
        }
      }
    });
  }

  subscribeBoatList() {
    this.getBoatPreviewList().subscribe((res: any) => {
      for (let i of res) i.image = this.getBoatImage(res.indexOf(i));
      this.boatList = res;
    });
  }

  subscribeBoatListParam(param: string) {
    this.getBoatPreviewListParam(param).subscribe((res: any) => {
      for (let i of res) i.image = this.getBoatImage(res.indexOf(i));
      this.boatList = res;
    });
  }

  subscribeCottageList() {
    this.getCottagePreviewList().subscribe((res: any) => {
      for (let i of res) i.image = this.getCottageImage(res.indexOf(i));
      this.cottageList = res;
    });
  }

  subscribeCottageListParam(param: string) {
    this.getCottagePreviewListParam(param).subscribe((res: any) => {
      for (let i of res) i.image = this.getCottageImage(res.indexOf(i));
      this.cottageList = res;
    });
  }

  subscribeAdventureList() {
    this.getAdventurePreviewList().subscribe((res: any) => {
      for (let i of res) i.image = this.getAdventureImage(res.indexOf(i));
      this.adventureList = res;
    });
  }

  subscribeAdventureListParam(param: string) {
    this.getAdventurePreviewListParam(param).subscribe((res: any) => {
      for (let i of res) i.image = this.getAdventureImage(res.indexOf(i));
      this.adventureList = res;
    });
  }

  getBoatPreviewListParam(param: string): any {
    return this.previewListService.getBoatPreviewListParam(param);
  }

  getCottagePreviewListParam(param: string): any {
    return this.previewListService.getCottagePreviewListParam(param);
  }

  getAdventurePreviewListParam(param: string): any {
    return this.previewListService.getAdventurePreviewListParam(param);
  }

  getBoatPreviewList(): any {
    return this.previewListService.getBoatPreviewList();
  }

  getCottagePreviewList(): any {
    return this.previewListService.getCottagePreviewList();
  }

  getAdventurePreviewList(): any {
    return this.previewListService.getAdventurePreviewList();
  }

  createSearchControl() {
    return new FormGroup({
      searchBar: new FormControl('', Validators.pattern('[0-9a-zA-Z ]*')),
    });
  }

  get cottageListEmpty() {
    if (this.cottageList === undefined) return true;
    else return this.cottageList.length === 0;
  }

  get boatListEmpty() {
    if (this.boatList === undefined) return true;
    else return this.boatList.length === 0;
  }

  get adventureListEmpty() {
    if (this.adventureList === undefined) return true;
    else return this.adventureList.length === 0;
  }

  public getBoatImage(i: number) {
    return (
      '../../../../../assets/images/boatPreviewList/b' +
      ((i % 5) + 1) +
      'preview.jpg'
    );
  }

  public getCottageImage(i: number) {
    return (
      '../../../../../assets/images/cottagePreviewList/c' +
      ((i % 5) + 1) +
      'preview.jpg'
    );
  }

  public getAdventureImage(i: number) {
    return (
      '../../../../../assets/images/adventurePreviewList/a' +
      ((i % 5) + 1) +
      'preview.jpg'
    );
  }

  public redirectCottage(id: number) {
    this.router.navigateByUrl('cottageProfile/' + id);
  }

  public redirectBoat(id: number) {
    this.router.navigateByUrl('boatProfile/' + id);
  }

  public redirectAdventure(id: number) {
    this.router.navigateByUrl('adventureProfile/' + id);
  }
}
