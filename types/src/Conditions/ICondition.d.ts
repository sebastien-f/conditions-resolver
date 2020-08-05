export interface ICondition {
    path: string;
    isMet<T = any>(potato: T): boolean;
}
