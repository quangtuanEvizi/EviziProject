export type CompanyPlanLevel =
  | "basic"
  | "standard"
  | "professional"
  | "enterprise";
export type CompanyOrder = {
  direction: "ASC" | "DESC";
  field: "NAME" | "CREATED_AT";
};
export interface QueryCompany {
  first?: number;
  after?: string | null;
  last?: number;
  before?: string | null;
  name?: string;
  industry?: string;
  active?: boolean[] | any;
  demo?: boolean[] | any;
  planLevel?: CompanyPlanLevel[] | any;
  productPlan?: string[];
  orderBy?: CompanyOrder;
}
