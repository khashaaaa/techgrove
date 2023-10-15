import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    model: string

    @Column()
    variant: string

    @Column()
    color: string

    @Column()
    storage: string

    @Column('money')
    init_price: number

    @Column('money')
    sell_price: number
}
