export class UpdateCustomerDto {
    mark: string
    email: string
    mobile: string
    password: string
    given_name?: string
    parent_name?: string
    facebook_id?: string
    google_id?: string
    orders?: any[] | undefined
    carts?: any[] | undefined
}