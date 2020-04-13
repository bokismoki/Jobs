import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Company } from "./company.entity";

export const GetCompany = createParamDecorator((data, ctx: ExecutionContext): Company => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});