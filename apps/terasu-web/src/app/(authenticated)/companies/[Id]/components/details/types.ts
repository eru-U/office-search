interface Philosophy {
  id: string;
  content: string | null;
}

interface Branch {
  id: string;
  address: string;
}

interface ContactPerson {
  id: string;
  name: string;
  position: string;
}

interface Welfare {
  id: string;
  name: string;
  content: string | null;
}

export interface YearlyDetailItem {
  id: string;
  employeeCount: number | null;
  representative: string | null;
  revenue: bigint | null;
  company: {
    establishedDate: Date | null;
    capital: bigint | null;
    phoneNumber: string | null;
    philosophies: Philosophy[];
    branches: Branch[];
  };
  contactPersons: ContactPerson[];
  welfares: Welfare[];
}

export interface YearDateData {
  id: string;
  dataDate: Date;
}

export type CacheData = Record<string, YearlyDetailItem[]>;
