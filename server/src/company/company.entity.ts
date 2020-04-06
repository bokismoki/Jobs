import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
@Unique(['email'])
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column()
    email: string

    @Column({ length: 25 })
    location: string

    @Column({ length: 3, default: 'N/A' })
    size: string

    @Column()
    password: string

    @Column({ default: false })
    admin: boolean

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string
}