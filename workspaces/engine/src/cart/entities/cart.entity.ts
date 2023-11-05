import { Customer } from "src/customer/entities/customer.entity"
import { Product } from "src/product/entities/product.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @ManyToOne(() => Customer, customer => customer.carts)
    customer: Customer

    @Column('simple-json')
    products: Product[]

    @Column('money')
    total_price: number

    @CreateDateColumn()
    created: Date
}