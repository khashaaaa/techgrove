import { Cart } from "src/cart/entities/cart.entity";
import { Customer } from "src/customer/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
    COMPLETED = 'COMPLETED'
}

@Entity()
export class Order {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer

    @Column('simple-json')
    cart: Cart

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
