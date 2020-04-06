import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DV_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
})