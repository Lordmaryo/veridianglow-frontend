export interface Coupon {
    _id: string;
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isActive: boolean;
    userId: string;
  }