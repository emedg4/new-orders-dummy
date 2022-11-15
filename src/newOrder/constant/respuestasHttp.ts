export const NOTENANTSFOUND = {
    status: 200,
    message: "No Tenant found, could not proceed sending to the queue",
    posible_solution: "Create new tenant"
}

export class CreatedTenantHttpResponse {
    public status: number;
    public message: string;
    public data: any;

    constructor(public createdTenant: any){
        }

    public async tenantCreated(){
        const response = {
            status: 200,
            message: "Tenant created",
            data:{
                createdTenant: this.createdTenant,
                date: Date()
            }
        }
        return response;
    } 

    public async tenantAlreadyExists(){
        const response = {
            status: 200,
            message: "Tenant was not created due to it already exists",
            data:{
                tenant: this.createdTenant,
                date: Date()
            }
        }
        return response;
    }
}