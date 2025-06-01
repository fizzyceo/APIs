interface Company {
  name: string;
  logo: string;
}
export interface Job {
  title: string;
  location: string;
  datePosted: Date;
  company: Company;
}
