// export const enum ServiceGroup{
//     CUSTOMERS = 1,
//     AGENTSESSIONS,
//     ADMIN,
//     MEMOS,
//     DOCUMENTS,
//     DISRUPTIONS,
//     LINKINGS,
//     SOLSTICE
// }
// export const enum Stack {
//     DSL=1,
//     CABLE,
//     MOBILE,
//     SAP_Z45,
//     SOLSTICE
// }

// a. Enum for ServiceGroup
export enum ServiceGroup {
    CUSTOMERS = "CUSTOMERS",
    AGENTSESSIONS = "AGENTSESSIONS",
    ADMIN = "ADMIN",
    MEMOS = "MEMOS",
    DOCUMENTS = "DOCUMENTS",
    DISRUPTIONS = "DISRUPTIONS",
    LINKINGS = "LINKINGS",
    SOLSTICE = "SOLSTICE"
    }
    
    // b. Union type or enum for Stack
    export type Stack = 'DSL' | 'CABLE' | 'MOBILE' | 'SAP_Z45' | 'SOLSTICE';
    