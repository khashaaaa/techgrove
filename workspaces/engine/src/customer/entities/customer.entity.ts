import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    mark: string

    @Column()
    email: string

    @Column()
    mobile: string

    @Column()
    given_name?: string

    @Column()
    parent_name?: string

    @Column()
    facebook_id?: string

    @Column()
    google_id?: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}
