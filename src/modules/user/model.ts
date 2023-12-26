export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ROLE;
};

export enum ROLE {
  ADMIN,
  ATC,
  SALES,
  COMMERCE,
}
