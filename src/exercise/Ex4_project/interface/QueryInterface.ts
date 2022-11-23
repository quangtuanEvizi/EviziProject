export type CompanyPlanLevel =
  | "basic"
  | "standard"
  | "professional"
  | "enterprise";
export type CompanyOrder = {
  direction: string
  field: string
};
export interface QueryCompany {
  first?: number;
  after?: string | null;
  last?: number;
  before?: string | null;
  name?: string;
  industry?: string;
  active?: boolean;
  demo?: boolean;
  planLevel?: CompanyPlanLevel[] | any;
  productPlan?: string[];
  orderBy?: CompanyOrder;
}
