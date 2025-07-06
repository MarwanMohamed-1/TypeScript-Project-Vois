import { ServiceGroup, Stack } from './enums';
import { IServiceMetadata, ConfigData } from './ServiceMetadata';

export class ServiceRegistery<T extends IServiceMetadata>{
    readonly services:T[]=[];
    
    constructor(services?: T[]) {
        this.services = services || []; 
    }
    addService(s:T)
    {
     this.services.push(s);   
    }
    filterByGroup(group:ServiceGroup) : T[]
    {
        return this.services.filter(service => service.group === group);
    }
    filterByStack(stack:Stack) : T[]
    {
        return this.services.filter(service => service.stack === stack);
    }
    retrieveActiveService() : T[]
    {
        return this.services.filter(service => service.isActive);
    }
    getServiceByName(name:string)
    {
        return this.services.find(s=>s.name == name);
    }
    loadServices()
    {
        this.services.forEach(element => {
            console.log(element);
        });
    }
    getServiceTimeout(serviceName: string, defaultTimeout?: number):number{
        const s = this.getServiceByName(serviceName);
        return s?.configData?.settings?.timeout ?? defaultTimeout ?? 0;
    }
    //TypeGaurd
    isServiceMetadata(obj: any): obj is IServiceMetadata
    {
        if(typeof obj !== 'object' || obj === null)
        {
            return false;
        }
        if(typeof obj.name !== 'string' || typeof obj.group !== 'string'|| typeof obj.stack !== 'string'
        || (!Array.isArray(obj.endpoints)) || typeof obj.version !=='string' || typeof obj.isActive !=='boolean'
        )
        {
            return false;
        }
        // since the config data is optional so we check at first of its existance then check about types 
        if (obj.configData !== undefined && obj.configData !== null) {
            const settings = obj.configData.settings;
        if(typeof settings.timeout !== 'number'|| typeof settings.retry !== 'number')
        {
            return false;
        }
    }
        return true;
    }
    //b.Write a function that returns all active services for a given stack.
    retrieveActiveServicesForSpecificStack(stack:Stack):IServiceMetadata[]
    {
        const Aservices:IServiceMetadata[]=[];
        this.services.forEach(element => {
            if(element.isActive == true && element.stack == stack)
            {
                Aservices.push(element);
            }
        });
        return Aservices;
    }
    //c.Write a function that returns all endpoints for a given group
    retrieveEndpointsforGiveGroup(group : ServiceGroup):string[]{
        const endpoints : string[]=[] ;
        this.services.forEach(element => {
            if(element.group == group){
                // Spread operator is used to push each endpoint individually into the array
                //instead of pushing the entire endpoints array as a single element
                endpoints.push(...element.endpoints);
            }
        });
        return endpoints;
    }
}