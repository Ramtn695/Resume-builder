export interface Resume {
  firstName: string;
  middleName?: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
  expOrFresher: string;
  experiences: Experience[];
}

export interface Experience {
  companyName: string;
  dateFrom: string;
  dateTo: string;
  designation: string;
  responsibilities: string | string [];
}
