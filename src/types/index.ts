export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
  password: string;
};

