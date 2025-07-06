import { ServiceGroup, Stack } from './enums';
import { employee, IServiceMetadata } from './ServiceMetadata';
import { ServiceRegistery } from './Service';
import serviceData from './services.json'
const defaultTimeout = 30000;
//Array of service from service.Json file to iniatilze the service registery
// because its generic and takes array in the constructor
const services: IServiceMetadata[] = [
  {
    "name": "CustomerInfo",
    "group": "Customers",
    "stack": "DSL",
    "version": "1.0.0",
    "endpoints": ["/api/customers/info", "/api/customers/details"],
    "isActive": true,
    "configData": {
      "settings": {
        "timeout": 30000,
        "retry": 3
      }
    }
  },
  {
    "name": "AgentSessionTrack",
    "group": "Agentsessions",
    "stack": "MOBILE",
    "version": "2.1.0",
    "endpoints": ["/api/agentsessions/start", "/api/agentsessions/end"],
    "isActive": true,
    "configData": null
  },
  {
    "name": "AdminUser",
    "group": "Admin",
    "stack": "SOLSTICE",
    "version": "1.0.1",
    "endpoints": ["/api/admin/users"],
    "isActive": false
  },
  {
    "name": "MemoNotes",
    "group": "Memos",
    "stack": "CABLE",
    "version": "3.0.0",
    "endpoints": ["/api/memos/list"],
    "isActive": true,
    "configData": {
      "settings": {
        "timeout": 45000
      }
    }
  },
  {
    "name": "DocumentArchive",
    "group": "Documents",
    "stack": "DSL",
    "version": "1.2.0",
    "endpoints": ["/api/documents/archive"],
    "isActive": true
  },
  {
    "name": "DisruptionMonitor",
    "group": "Disruptions",
    "stack": "SAP_Z45",
    "version": "1.3.0",
    "endpoints": ["/api/disruptions/status"],
    "isActive": false,
    "configData": {
      "settings": {
        "retry": 5
      }
    }
  },
  {
    "name": "LinkingService",
    "group": "Linkings",
    "stack": "CABLE",
    "version": "2.0.0",
    "endpoints": ["/api/linkings/connect"],
    "isActive": true
  },
  {
    "name": "SolsticeMain",
    "group": "Solstice",
    "stack": "SOLSTICE",
    "version": "1.0.0",
    "endpoints": ["/api/solstice/main"],
    "isActive": true,
    "configData": {
      "settings": {
        "timeout": 60000,
        "retry": 1
      }
    }
  }
]
;
const newServc : IServiceMetadata = 
{
    name : "service2",
    isActive : false,
    endpoints :["endpointurl"],
    group : "DISRUPTIONS",
    version:"newwwww2",
    stack:'CABLE',
    configData : {
      settings : {
        retry :1 ,
        timeout :10
      }
    }
}
const newServc1: IServiceMetadata = 
{
    name : "service1",
    isActive : false,
    endpoints :["endpointurl"],
    group : "DISRUPTIONS",
    version:"newwwww",
    stack:'CABLE',
    configData : {
      settings :{
        retry :10,
        timeout : 34
      }
    }
}
  const registry = new ServiceRegistery<IServiceMetadata>(services);
  //Make optional parameter constructor
  const registry2 = new ServiceRegistery<IServiceMetadata>();
  registry.addService(newServc);
  registry.addService(newServc1);
  console.log("Loading all services");
  registry.loadServices();
  //for testing the typegaurd function
  const u : employee = {
    name: "M"
  }
  //type gaurd function check 
  /**
   * first two are IServiceMetadata
   * last one no 
   */
  console.log("Checking Object type");
  console.log(registry.isServiceMetadata(newServc));
  console.log(registry.isServiceMetadata(newServc1));
  console.log(registry.isServiceMetadata(u));
  /**
   * 1st service exist so it will return its timeout 
   * 2nd one not exist so it will return the default time out
   */
  console.log("Service TimeOut");
  console.log(registry.getServiceTimeout("service1",defaultTimeout));
  console.log(registry.getServiceTimeout("service4",defaultTimeout));

  /**
   * retrieve all end points for given group 
   */
  console.log("Retrieving all endpoints for specific service group");
  console.log(registry.retrieveEndpointsforGiveGroup(ServiceGroup.SOLSTICE));
  
  
  