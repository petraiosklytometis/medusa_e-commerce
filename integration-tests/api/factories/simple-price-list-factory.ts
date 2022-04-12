import {
  PriceList,
  MoneyAmount,
  PriceListType,
  PriceListStatus,
} from "@medusajs/medusa"
import faker from "faker"
import { Connection } from "typeorm"

type ProductListPrice = {
  variant_id: string
  currency_code: string
  region_id: string
  amount: number
}

export type PriceListFactoryData = {
  id?: string
  name?: string
  description?: string
  type?: PriceListType
  status?: PriceListStatus
  starts_at?: Date
  ends_at?: Date
  customer_groups?: string[]
  prices?: ProductListPrice[]
}

export const simplePriceListFactory = async (
  connection: Connection,
  data: PriceListFactoryData = {},
  seed?: number
): Promise<PriceList> => {
  if (typeof seed !== "undefined") {
    faker.seed(seed)
  }

  const manager = connection.manager

  const listId = data.id || `simple-price-list-${Math.random() * 1000}`
  const toCreate = {
    id: listId,
    name: data.name || faker.commerce.productName(),
    description: data.description || "Some text",
    status: data.status || PriceListStatus.ACTIVE,
    type: data.type || PriceListType.OVERRIDE,
    starts_at: data.starts_at || null,
    ends_at: data.ends_at || null,
  }

  const toSave = manager.create(PriceList, toCreate)
  const toReturn = await manager.save(toSave)

  if (typeof data.prices !== "undefined") {
    for (const ma of data.prices) {
      const factoryData = {
        ...ma,
        price_list_id: listId,
      }
      const toSave = manager.create(MoneyAmount, factoryData)
      await manager.save(toSave)
    }
  }

  return toReturn
}