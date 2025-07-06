"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRegistery = void 0;
class ServiceRegistery {
    constructor(services) {
        this.services = [];
        this.services = services || [];
    }
    addService(s) {
        this.services.push(s);
    }
    filterByGroup(group) {
        return this.services.filter(service => service.group === group);
    }
    filterByStack(stack) {
        return this.services.filter(service => service.stack === stack);
    }
    retrieveActiveService() {
        return this.services.filter(service => service.isActive);
    }
    getServiceByName(name) {
        return this.services.find(s => s.name == name);
    }
    loadServices() {
        this.services.forEach(element => {
            console.log(element);
        });
    }
    getServiceTimeout(serviceName, defaultTimeout) {
        var _a, _b, _c, _d;
        const s = this.getServiceByName(serviceName);
        return (_d = (_c = (_b = (_a = s === null || s === void 0 ? void 0 : s.configData) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.timeout) !== null && _c !== void 0 ? _c : defaultTimeout) !== null && _d !== void 0 ? _d : 0;
    }
    //TypeGaurd
    isServiceMetadata(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        if (typeof obj.name !== 'string' || typeof obj.group !== 'string' || typeof obj.stack !== 'string'
            || (!Array.isArray(obj.endpoints)) || typeof obj.version !== 'string' || typeof obj.isActive !== 'boolean') {
            return false;
        }
        // since the config data is optional so we check at first of its existance then check about types 
        if (obj.configData !== undefined && obj.configData !== null) {
            const settings = obj.configData.settings;
            if (typeof settings.timeout !== 'number' || typeof settings.retry !== 'number') {
                return false;
            }
        }
        return true;
    }
    //c.Write a function that returns all endpoints for a given group
    retrieveEndpointsforGiveGroup(group) {
        const endpoints = [];
        this.services.forEach(element => {
            if (element.group == group) {
                // Spread operator is used to push each endpoint individually into the array
                //instead of pushing the entire endpoints array as a single element
                endpoints.push(...element.endpoints);
            }
        });
        return endpoints;
    }
}
exports.ServiceRegistery = ServiceRegistery;
