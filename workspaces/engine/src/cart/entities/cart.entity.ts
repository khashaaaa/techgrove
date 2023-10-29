import { Customer } from "src/customer/entities/customer.entity"
import { Product } from "src/product/entities/product.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    mark: number

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @Column('simple-json')
    products: Product[]

    @Column('money')
    total_price: number

    @CreateDateColumn()
    created: Date
}