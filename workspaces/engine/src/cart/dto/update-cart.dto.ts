import { Customer } from "src/customer/entities/customer.entity"
import { Product } from "src/product/entities/product.entity"

export class UpdateCartDto {
    mark: number
    customer?: Customer
    products?: Product[]
    total_price?: number
}
