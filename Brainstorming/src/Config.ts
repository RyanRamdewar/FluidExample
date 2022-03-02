import { AzureClientProps, AzureFunctionTokenProvider, LOCAL_MODE_TENANT_ID } from "@fluidframework/azure-client";
import { SharedMap } from "fluid-framework";
import { getRandomName } from "@fluidframework/server-services-client";
import { v4 as uuid } from 'uuid';
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";

export const useAzure = process.env.REACT_APP_FLUID_CLIENT === "azure";

export const containerSchema = {
    initialObjects: {
        map: SharedMap,
    },
}

export const userConfig = {
    id: uuid(),
    name: getRandomName(),
};

export const connectionConfig: AzureClientProps = useAzure ? {
    connection: {
        tenantId: "",
        //tokenProvider: new AzureFunctionTokenProvider("https://rrtokenprovider.azurewebsites.net/api/TokenProvider"),
        tokenProvider: new InsecureTokenProvider("e10457b6ce271317fc7e960db10e0abd", userConfig),
        orderer: "https://alfred.westus2.fluidrelay.azure.com",
        storage: "https://historian.westus2.fluidrelay.azure.com",
    }
} : {
    connection: {
        tenantId: LOCAL_MODE_TENANT_ID,
        tokenProvider: new InsecureTokenProvider("e10457b6ce271317fc7e960db10e0abd", userConfig),
        orderer: "http://localhost:7070",
        storage: "http://localhost:7070",
    }
};
