import { Customer } from "src/customer/entities/customer.entity"
import { Product } from "src/product/entities/product.entity"

export class UpdateCartDto {
    mark: string
    customer?: Customer
    products?: Product[]
    total_price?: number
}
