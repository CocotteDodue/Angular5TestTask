import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { FilterService } from "../../services/filter.service";
import { DatesFilter } from "../../models/dates-filter";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.css"]
})
export class FiltersComponent implements OnDestroy {

    public stopSearch: Subject<boolean> = new Subject<boolean>();

    constructor(private filteringService: FilterService) { }

    public ngOnDestroy(): void {
        this.stopSearch.next(true);
        this.stopSearch.unsubscribe();
    }

    public updateDateChange(updatedDateFilter: DatesFilter): void {
        this.stopSearch.next(true);

        this.filteringService.setDates(updatedDateFilter);
        this.filteringService.searchCompletedAudits(this.stopSearch)
            .takeUntil(this.stopSearch)
            .subscribe();
    }

}
