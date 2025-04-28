import {
  ForwarderApiContractParams,
  ForwarderApiCreateContractResponse,
  ForwarderApiGetContractResponse,
} from "./types/forwarder"

const FORWARDER_API_BASE_URL = "https://forwarder.mainnet.aurora.dev"
const FORWARDER_CONTRACT_ID = "fees.deposit.aurora"

const request = async <T>(
  endpoint: string,
  {
    method = "GET",
    params,
    data,
  }: {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: Record<string, string>
    data?: Record<string, unknown>
  } = {},
): Promise<T> => {
  const url = new URL(endpoint, FORWARDER_API_BASE_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const { href } = url

  if (!process.env.FORWARDER_API_KEY) {
    throw new Error("FORWARDER_API_KEY is not set")
  }

  const res = await fetch(href, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FORWARDER_API_KEY}`,
    },
  })

  const resultData = (await res.json()) as T

  if (!res.ok) {
    throw new Error(`Forwarder API call failed: ${res.status}`)
  }

  return resultData
}

/**
 * @see https://github.com/aurora-is-near/near-forwarder-indexer
 */
export const forwarderApiClient = {
  getContract: async ({
    targetAddress,
    targetNetwork,
  }: ForwarderApiContractParams) =>
    request<ForwarderApiGetContractResponse>(
      `/api/v1/forwarder_contract_params`,
      {
        params: {
          fees_contract_id: FORWARDER_CONTRACT_ID,
          target_address: targetAddress,
          target_network: targetNetwork,
          environment: "STAGING", // added here
        },
      },
    ),
  createContract: async ({
    targetAddress,
    targetNetwork,
  }: ForwarderApiContractParams) =>
    request<ForwarderApiCreateContractResponse>("/api/v1/create_contract", {
      method: "POST",
      data: {
        fees_contract_id: FORWARDER_CONTRACT_ID,
        target_address: targetAddress,
        target_network: targetNetwork,
      },
    }),
}
