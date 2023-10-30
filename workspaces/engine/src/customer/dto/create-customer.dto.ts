export class CreateCustomerDto {
    email: string
    mobile: string
    given_name?: string
    parent_name?: string
    facebook_id?: string
    google_id?: string
    orders?: any[] | undefined
    carts?: any[] | undefined
}