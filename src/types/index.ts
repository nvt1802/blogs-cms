export interface IUser {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  role: "user" | "author" | "admin";
  created_at: string;
  updated_at: string;
}