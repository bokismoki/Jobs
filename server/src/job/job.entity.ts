import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Company } from "src/company/company.entity"

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    title: string

    @Column()
    job_link: string

    @Column()
    description: string

    @Column({ default: false })
    approved: boolean

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string

    @ManyToOne(type => Company, company => company.jobs, { onDelete: 'CASCADE' })
    company: Company
}