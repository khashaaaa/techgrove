import { Cart } from 'src/cart/entities/cart.entity'
import { Order } from 'src/order/entities/order.entity'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    email: string

    @Column()
    mobile: string

    @Column({ nullable: true })
    given_name?: string

    @Column({ nullable: true })
    parent_name?: string

    @Column({ nullable: true })
    facebook_id?: string

    @Column({ nullable: true })
    google_id?: string

    @OneToMany(() => Order, order => order.customer)
    orders?: Order[]

    @OneToMany(() => Cart, cart => cart.customer)
    carts?: Cart[]

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
