import{ServiceGroup,Stack}from"./enums";

export interface IServiceMetadata {
    name:string;
    group:ServiceGroup|string;
    stack:Stack
    version: string;
    endpoints: string[]
    isActive: boolean;
    configData? : ConfigData | null;
}
export interface ConfigData {
    settings?: {
      timeout?: number;
      retry?: number;
    };
  }

  export interface employee {
    name : string;
  }
