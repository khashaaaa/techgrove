import { Customer } from 'src/customer/entities/customer.entity'

export class UpdateTradinDto {

    mark: number
    customer?: Customer
    current_model?: string
    queued_model?: string
    scratch?: boolean
    battery?: number
}
