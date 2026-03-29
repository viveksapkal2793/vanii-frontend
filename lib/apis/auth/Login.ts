import { PostApiInput } from "@/types/api";
import UserDetails from "@/types/user-details";
import { PostApi } from "@/lib/apis/PostApi";

interface LoginData {
  phone: string;
  password: string;
}

type LoginResponse = Omit<UserDetails, "password">;

const URL = "/api/v1/user/login";

export async function PostLogin({
  axios,
  data,
  onSuccess,
  onError,
}: Omit<PostApiInput<LoginResponse, LoginData>, "url">) {
  await PostApi<LoginResponse, LoginData>({
    url: URL,
    axios,
    data,
    onSuccess,
    onError,
  });
}
