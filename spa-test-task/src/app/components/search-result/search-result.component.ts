import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

import { FilterService } from "../../services/filter.service";
import { IItemCompletedAuditSearchResult } from "../../models/item-completed-audit-search-result";
import { Subject } from "rxjs/Subject";

@Component({
    selector: "app-search-result",
    templateUrl: "./search-result.component.html",
    styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) public paginator: MatPaginator;

    public resultTypeTitle: string = "";

    public displayedColumns = ["nameCat", "completedAudits", "graph"];
    public dataSource: MatTableDataSource<IItemCompletedAuditSearchResult>;

    private unsuscribeAll: Subject<boolean> = new Subject<boolean>();

    constructor(private filterService: FilterService) { }

    public ngOnInit(): void {
        this.filterService.upToDateSearchResults
            .takeUntil(this.unsuscribeAll)
            .subscribe(
                (resultArray: Array<IItemCompletedAuditSearchResult>) => {
                    this.dataSource = new MatTableDataSource<IItemCompletedAuditSearchResult>(resultArray);
                    this.dataSource.paginator = this.paginator;
                }
            );

        this.filterService.upToDateSearchResultsTitle
            .takeUntil(this.unsuscribeAll)
            .subscribe(
                (title) => {
                    this.resultTypeTitle = title;
                }
            );
    }

    public ngOnDestroy(): void {
        this.unsuscribeAll.next(true);
        this.unsuscribeAll.unsubscribe();
    }
}
