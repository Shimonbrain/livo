export interface OrdersApi {
    items: OrderData[];
    total_count: number;
  }

export interface OrderData {
    number: string;
    date: string;
    status: string;
    total: number;
    total_tax: number;
    shipping_tax: number;
}