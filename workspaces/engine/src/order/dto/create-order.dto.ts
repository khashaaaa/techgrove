import { Customer } from "src/customer/entities/customer.entity";

export class CreateOrderDto {

    customer: Customer
    cart: any
    status: any
}
