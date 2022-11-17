import { Location } from "./location";
import { Region } from "./region";

export interface Company {
  id: number;
  name: string;
  planLevel: string;
  industry: string;
  regions: [Region];
  locations: [Location];
  demo: boolean;
  active: boolean;
}
