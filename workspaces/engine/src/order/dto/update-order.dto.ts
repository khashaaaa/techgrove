import { Customer } from "src/customer/entities/customer.entity"

export class UpdateOrderDto {

    mark: string
    customer?: Customer
    cart?: any
    status?: any
}
