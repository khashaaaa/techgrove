import { Customer } from "src/customer/entities/customer.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Tradin {

    @PrimaryGeneratedColumn()
    mark: number

    @ManyToOne(() => Customer, customer => customer.tradin)
    customer: Customer

    @Column()
    current_model: string

    @Column()
    queued_model: string

    @Column({ type: 'boolean', default: false })
    scratch: boolean

    @Column()
    battery: number
}
