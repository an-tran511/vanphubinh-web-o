export interface IPartner {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  isCustomer: boolean;
  isSupplier: boolean;
}

export interface ListResponse<T> {
  data: T[];
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
  };
}
