import { Customer } from "src/customer/entities/customer.entity"
import { Order } from "src/order/entities/order.entity"

export class UpdateReturnDto {

    mark: string
    customer: Customer
    order: Order
    comment: string
    commission: number
    date_returned: Date
}
