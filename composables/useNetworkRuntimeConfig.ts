export const useNetworkRuntimeConfig = () => {
  const runtimeConfig = window && window["##runtimeConfig"];

  // Important: before adding new env variables, make sure to list them as public in `nuxt.config.ts`
  return {
    id: runtimeConfig?.networkId || process.env.NETWORK_ID,
    key: runtimeConfig?.networkKey || process.env.NETWORK_KEY,
    name: runtimeConfig?.networkName || process.env.NETWORK_NAME,
    rpcUrl: runtimeConfig?.networkRpcUrl || process.env.NETWORK_RPC_URL,
    blockExplorerUrl: runtimeConfig?.blockExplorerUrl || process.env.NETWORK_BLOCK_EXPLORER_URL,
    blockExplorerApi: runtimeConfig?.blockExplorerApi || process.env.NETWORK_BLOCK_EXPLORER_API,
    l1Network: runtimeConfig?.l1Network || process.env.L1_NETWORK,
  };
};
