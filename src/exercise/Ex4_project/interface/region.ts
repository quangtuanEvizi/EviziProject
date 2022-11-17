import { Company } from "./company";

export interface Region {
  name: string,
  company: Company,
  locations: [Location],
  isActive: boolean
}