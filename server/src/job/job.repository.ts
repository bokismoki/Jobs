import { EntityRepository, Repository, getRepository, getManager, getConnection } from "typeorm"
import { Job } from "./job.entity"
import { CreateJobDto } from "./dto/create-job.dto"
import { Company } from "src/company/company.entity"
import { GetJobsPaginationDto } from "./dto/get-jobs-pagination.dto"

@EntityRepository(Job)
export class JobRepository extends Repository<Job> {
    async getJobs(): Promise<Job[]> {
        const query = await getRepository(Job)
            .createQueryBuilder()
            .select('job')
            .from(Job, 'job')
            .orderBy('job.created_at', 'ASC')
            .leftJoinAndSelect('job.company', 'company')
            .where('job.approved = 0')
            .getMany()
        query.forEach(job => {
            delete job.company.email
            delete job.company.password
            delete job.company.admin
        })
        return query
    }

    async getApprovedJobs(getJobsPaginationDto: GetJobsPaginationDto): Promise<Job[]> {
        const { skip = 0 }: any = getJobsPaginationDto

        const query = await getRepository(Job)
            .createQueryBuilder()
            .select('job')
            .from(Job, 'job')
            .orderBy('job.created_at', 'DESC')
            .leftJoinAndSelect('job.company', 'company')
            .where('job.approved = 1')
            .skip((skip * 6))
            .take(6)
            .getMany()

        query.forEach(job => {
            delete job.company.email
            delete job.company.password
            delete job.company.admin
        })
        return query
    }

    async createJob(file, createJobDto: CreateJobDto): Promise<void> {
        const { title, job_link, description, companyId } = createJobDto
        const job = new Job()
        job.title = title
        job.job_link = job_link
        job.description = description
        job.image_path = file.filename

        const entityManager = getManager()

        const company = await entityManager.findOne(Company, companyId)
        job.company = company

        await job.save()
    }
}