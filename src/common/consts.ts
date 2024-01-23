import { SupportedChainId } from "./chains";


export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.LIGHTLINK_PHOENIX_MAINNET,
  SupportedChainId.LIGHTLINK_PEGASUS_TESTNET,
  SupportedChainId.SEPOLIA,
];

export function mapSupportedNetworks<T>(
  value: (chainId: SupportedChainId) => T
): Record<SupportedChainId, T>;
export function mapSupportedNetworks<T>(value: T): Record<SupportedChainId, T>;
export function mapSupportedNetworks<T>(
  value: T | ((chainId: SupportedChainId) => T)
): Record<SupportedChainId, T> {
  return ALL_SUPPORTED_CHAIN_IDS.reduce<Record<number, T>>(
    (acc, chainId) => ({
      ...acc,
      [chainId]:
        typeof value === "function"
          ? (value as (chainId: SupportedChainId) => T)(chainId)
          : value,
    }),
    {}
  );
}

export function mapAddressToSupportedNetworks(
  address: string
): Record<SupportedChainId, string> {
  return mapSupportedNetworks(address);
}