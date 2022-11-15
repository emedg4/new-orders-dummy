import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModifyTenant } from "./dto/modifyTenant.dto";
import { TenantEntity } from "./entities/tenants.entity";

@Injectable()
export class NewOrderModel {
    constructor(
        @InjectRepository(TenantEntity) private tenantRepository: Repository<TenantEntity>,
    ){}

    async create(name: string): Promise<TenantEntity>{
        const tenantEntity: TenantEntity = new TenantEntity()
        tenantEntity.nombre = name;

        const tenantEntityObject = this.tenantRepository.create(tenantEntity);
        const savedTenantEntityObject: TenantEntity = await this.tenantRepository.save(tenantEntityObject)
        console.log(savedTenantEntityObject,"webos")
        return savedTenantEntityObject;
    }

    async modify(data: ModifyTenant){
        return await this.tenantRepository.update({nombre: data.oldName}, {nombre: data.newName})
    }

    async delete(name: string){
        return await this.tenantRepository.delete({nombre: name})
    }

    async getAll(){
        return await this.tenantRepository.find()
    }

    async findByName(name: string){
        return await this.tenantRepository.findBy({nombre: name})
    }
}