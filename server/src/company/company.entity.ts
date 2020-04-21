import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Job } from "src/job/job.entity"

@Entity()
@Unique(['email'])
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    name: string

    @Column()
    email: string

    @Column()
    site: string

    @Column({ length: 25 })
    location: string

    @Column({ length: 3 })
    size: string

    @Column()
    password: string

    @Column()
    image_path: string

    @Column({ default: false })
    admin: boolean

    @Column({ default: false })
    confirmed: boolean

    @Column({ default: '' })
    confirmation_token: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string

    @OneToMany(type => Job, job => job.company)
    jobs: Job[]
}