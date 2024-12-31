export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface Profile {
  user: User;
  links: Link[];
}
