import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdventureService } from 'src/app/features/adventure/adventure.service';
import { BoatEntityService } from 'src/app/features/cottage/services/boat-entity.service';
import { CottageService } from 'src/app/features/cottage/services/cottage.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css'],
})
export class EntityListComponent implements OnInit {
  totalItems: number = 0;
  pageSlice: any[] = [];
  pageSize: number = 3;
  pageSizeOptions: number[] = [this.pageSize];
  sort: FormControl = new FormControl('');

  search: boolean = false;
  //either 'cottage', 'boat' or 'adventure'
  mode: string;
  @ViewChild('paginator') paginator: MatPaginator;

  searchForm: FormGroup = this.createSearchForm();
  constructor(
    private cottageService: CottageService,
    private boatService: BoatEntityService,
    private adventureService: AdventureService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setMode();
    this.setCount();
    this.setPageView(0);
    this.sort.valueChanges.subscribe((res: any) => {
      this.setSortView(0);
    });
  }

  setMode(): void {
    switch (this.router.url) {
      case '/home/cottageList':
        this.mode = 'cottage';
        break;
      case '/home/boatList':
        this.mode = 'boat';
        break;
      case '/home/adventureList':
        this.mode = 'adventure';
        break;
      default:
        break;
    }
  }

  setCount(): void {
    switch (this.mode) {
      case 'cottage':
        this.getCottagesCount().subscribe((res: any) => {
          this.totalItems = res;
        });
        break;
      case 'boat':
        this.getBoatsCount().subscribe((res: any) => {
          this.totalItems = res;
        });
        break;
      case 'adventure':
        this.getAdventuresCount().subscribe((res: any) => {
          this.totalItems = res;
        });
        break;
      default:
        break;
    }
  }

  setPageView(page: number): void {
    switch (this.mode) {
      case 'cottage':
        this.getCottagesPage(page).subscribe((res: any) => {
          this.pageSlice = res;
        });
        break;
      case 'boat':
        this.getBoatsPage(page).subscribe((res: any) => {
          this.pageSlice = res;
        });
        break;
      case 'adventure':
        this.getAdventuresPage(page).subscribe((res: any) => {
          this.pageSlice = res;
        });
        break;
      default:
        break;
    }
  }

  setSortView(page: number): void {
    switch (this.mode) {
      case 'cottage':
        if (!this.search) {
          this.getCottagesPage(page, this.sort.value).subscribe((res: any) => {
            this.paginator.firstPage();
            this.pageSlice = res;
          });
        } else {
          this.getCottagesPageSearch(page, this.sort.value).subscribe(
            (res: any) => {
              this.paginator.firstPage();
              this.pageSlice = res;
            }
          );
        }
        break;
      case 'boat':
        if (!this.search) {
          this.getBoatsPage(page, this.sort.value).subscribe((res: any) => {
            this.paginator.firstPage();
            this.pageSlice = res;
          });
        } else {
          this.getBoatsPageSearch(page, this.sort.value).subscribe(
            (res: any) => {
              this.paginator.firstPage();
              this.pageSlice = res;
            }
          );
        }
        break;
      case 'adventure':
        if (!this.search) {
          this.getAdventuresPage(page, this.sort.value).subscribe(
            (res: any) => {
              this.paginator.firstPage();
              this.pageSlice = res;
            }
          );
        } else {
          this.getAdventuresPageSearch(page, this.sort.value).subscribe(
            (res: any) => {
              this.paginator.firstPage();
              this.pageSlice = res;
            }
          );
        }

        break;
      default:
        break;
    }
  }

  onPageChange(event: PageEvent) {
    switch (this.mode) {
      case 'cottage':
        if (!this.search) {
          this.getCottagesPage(event.pageIndex, this.sort.value).subscribe(
            (res: any) => {
              this.pageSlice = res;
            }
          );
        } else {
          this.getCottagesPageSearch(
            event.pageIndex,
            this.sort.value
          ).subscribe((res: any) => {
            this.pageSlice = res;
          });
        }
        break;
      case 'boat':
        if (!this.search) {
          this.getBoatsPage(event.pageIndex, this.sort.value).subscribe(
            (res: any) => {
              this.pageSlice = res;
            }
          );
        } else {
          this.getBoatsPageSearch(event.pageIndex, this.sort.value).subscribe(
            (res: any) => {
              this.pageSlice = res;
            }
          );
        }
        break;
      case 'adventure':
        if (!this.search) {
          this.getAdventuresPage(event.pageIndex, this.sort.value).subscribe(
            (res: any) => {
              this.pageSlice = res;
            }
          );
        } else {
          this.getAdventuresPageSearch(
            event.pageIndex,
            this.sort.value
          ).subscribe((res: any) => {
            this.pageSlice = res;
          });
        }
        break;
      default:
        break;
    }
  }

  redirectToEntity(id: number) {
    localStorage.setItem(
      'startDate',
      this.convertDateToString(this.searchForm.controls['startDate'].value)
    );
    localStorage.setItem(
      'endDate',
      this.convertDateToString(this.searchForm.controls['endDate'].value)
    );

    switch (this.mode) {
      case 'cottage':
        this.router.navigate(['cottageProfile/' + id]);
        break;
      case 'boat':
        this.router.navigate(['boatProfile/' + id]);
        break;
      case 'adventure':
        this.router.navigate(['adventureProfile/' + id]);
        break;
      default:
        break;
    }
  }

  getCottagesCount() {
    return this.cottageService.getCottagesCount();
  }

  getCottagesPage(pageNum: number, sort: string = 'default') {
    return this.cottageService.getCottagesPage(pageNum, this.pageSize, sort);
  }

  getCottagesPageSearch(pageNum: number, sort: string = 'default') {
    return this.cottageService.getCottagesPageSearch(
      pageNum,
      this.pageSize,
      sort,
      this.searchForm.getRawValue()
    );
  }

  getBoatsCount() {
    return this.boatService.getBoatsCount();
  }

  getBoatsPage(pageNum: number, sort: string = 'default') {
    return this.boatService.getBoatsPage(pageNum, this.pageSize, sort);
  }

  getBoatsPageSearch(pageNum: number, sort: string = 'default') {
    return this.boatService.getBoatsPageSearch(
      pageNum,
      this.pageSize,
      sort,
      this.searchForm.getRawValue()
    );
  }

  getAdventuresCount() {
    return this.adventureService.getAdventuresCount();
  }

  getAdventuresPage(pageNum: number, sort: string = 'default') {
    return this.adventureService.getAdventuresPage(
      pageNum,
      this.pageSize,
      sort
    );
  }

  getAdventuresPageSearch(pageNum: number, sort: string = 'default') {
    return this.adventureService.getAdventuresPageSearch(
      pageNum,
      this.pageSize,
      sort,
      this.searchForm.getRawValue()
    );
  }

  getSummarizedDescription(description: string): string {
    if (description.length < 550) return description;
    else return description.substring(0, 550) + '...';
  }

  createSearchForm(): FormGroup {
    return new FormGroup({
      startDate: new FormControl({ value: '' }, Validators.required),
      endDate: new FormControl({ value: '' }, Validators.required),
      name: new FormControl(''),
      minRating: new FormControl(0),
      location: new FormControl(''),
      capacity: new FormControl(0),
      minPrice: new FormControl(0),
      maxPrice: new FormControl(null),
    });
  }

  openSearchDialog() {
    this.searchForm = this.createSearchForm();
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      data: this.searchForm,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result.search) {
        this.search = true;
        this.paginator.firstPage();
        this.sort.setValue('');
        switch (this.mode) {
          case 'cottage':
            this.cottageService
              .getCottagesPageSearch(
                0,
                this.pageSize,
                'default',
                this.searchForm.getRawValue()
              )
              .subscribe((res: any) => {
                this.pageSlice = res;
              });
            this.cottageService
              .getCottagesPageSearchCount(this.searchForm.getRawValue())
              .subscribe((res: any) => {
                this.totalItems = res;
              });
            break;
          case 'boat':
            this.boatService
              .getBoatsPageSearch(
                0,
                this.pageSize,
                'default',
                this.searchForm.getRawValue()
              )
              .subscribe((res: any) => {
                this.pageSlice = res;
              });
            this.boatService
              .getBoatsPageSearchCount(this.searchForm.getRawValue())
              .subscribe((res: any) => {
                this.totalItems = res;
              });
            break;
          case 'adventure':
            this.adventureService
              .getAdventuresPageSearch(
                0,
                this.pageSize,
                'default',
                this.searchForm.getRawValue()
              )
              .subscribe((res: any) => {
                this.pageSlice = res;
              });
            this.adventureService
              .getAdventuresPageSearchCount(this.searchForm.getRawValue())
              .subscribe((res: any) => {
                this.totalItems = res;
              });
            break;
        }
      }
    });
  }

  resetSearch() {
    this.ngOnInit();
    this.search = false;
    this.sort.setValue('');
  }

  convertDateToString(date: any): string {
    if (date.value !== '') {
      date = date as Date;
      return (
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
      );
    } else return '';
  }
}
