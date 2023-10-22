import { Customer } from "src/customer/entities/customer.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Return {

    @PrimaryGeneratedColumn()
    mark: number

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order

    @Column('text')
    comment: string

    @Column('money')
    commission: number

    @Column()
    date_issued: Date

    @CreateDateColumn()
    created: Date
}