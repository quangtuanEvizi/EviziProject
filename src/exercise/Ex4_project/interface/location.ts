import { Company } from "./company";
import { Region } from "./region";

export interface Location {
  name: string,
  company: Company,
  region: Region,
  isActive: boolean
}