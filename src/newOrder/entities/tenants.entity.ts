import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NOMBRE_TENANT } from "./constants/tableNames";

@Entity({name: "Tenants"})
export class TenantEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: NOMBRE_TENANT})
    public nombre: string;
}