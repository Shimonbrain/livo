import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { QueryResultsModel } from './models/query-models/query-results.model';
import { HttpExtenstionsModel } from "./models/http-extentsions-model"
import { OrderData } from "../interface/order"

import { LivoService } from '../services/livo.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { QueryParamsModel } from './models/query-models/query-params.model';


export class OrderDataSource implements DataSource<OrderData> {
    // Public properties
    entitySubject = new BehaviorSubject<OrderData[]>([]);
    hasItems: boolean = false; // Need to show message: 'No records found

    // Loading | Progress bar
    loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean>;

    // Paginator | Paginators count
    paginatorTotalSubject = new BehaviorSubject<number>(0);
    paginatorTotal$: Observable<number>;

    data = [];

    constructor(private livoService: LivoService) {
        this.loading$ = this.loadingSubject.asObservable();
        this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
        this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
    }

    connect(): Observable<any[]> {
        return this.entitySubject.asObservable();
    }

    disconnect(): void {
        this.entitySubject.complete();
        this.loadingSubject.complete();
        this.paginatorTotalSubject.complete();
    }

    baseFilter(_entities: any[], _queryParams: QueryParamsModel): QueryResultsModel {
        let entitiesResult = _entities;
        const totalCount = _queryParams.length;
        const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
        const queryResults = new QueryResultsModel();
        queryResults.items = _entities;
        queryResults.totalCount = totalCount;
        return queryResults;
    }

    loadOrders(queryParams: QueryParamsModel) {
        this.loadingSubject.next(true);
        this.livoService.getOrders(queryParams.filter, queryParams.pageNumber).pipe(
            tap((res: any) => {
                let orders = res['orders'];
                this.data = orders;
                queryParams.length = res["meta"]["length"];
                const result = this.baseFilter(orders, queryParams);
                this.entitySubject.next(result.items);
                this.paginatorTotalSubject.next(result.totalCount);
            }),
            catchError(err => of(new QueryResultsModel([], err))),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe()
    }

    sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
        const httpExtenstion = new HttpExtenstionsModel();
        return httpExtenstion.sortArray(_incomingArray, _sortField, _sortOrder);
    }
}
