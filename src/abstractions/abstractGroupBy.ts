import { GroupedData } from ".";

export abstract class AbstractGroupBy {

    protected _groupedData: GroupedData;

    constructor(groups: GroupedData) {
        this._groupedData = groups;

    }

    get groupedData() {
        return this._groupedData
    }

    public count() {
        return this._count();
    }

    public sum(column: string): { [key: string]: number } {
        return this._sum(column);
    }

    public max(column: string): { [key: string]: number } {
        return this._max(column);
    }

    public mean(column: string): { [key: string]: number } {
        return this._mean(column);
    }

    public min(column: string): { [key: string]: number } {
        return this._min(column);
    }

    protected abstract _count(): { [key: string]: number }

    protected abstract _max(column: string): { [key: string]: number }

    protected abstract _mean(column: string): { [key: string]: number }

    protected abstract _min(column: string): { [key: string]: number }

    protected abstract _sum(column: string): { [key: string]: number }


}