import { GetApiInput } from "@/types/api";
import { GetApi } from "@/lib/apis/GetApi";
import UserDetails from "@/types/user-details";

// Define the actual response structure from the backend
interface GetUserResponse {
  user: UserDetails;
}

const URL = "/api/v1/user/get-user";

export async function GetUser({
  axios,
  onSuccess,
  onError,
}: Omit<GetApiInput<GetUserResponse>, "url">) {
  GetApi<GetUserResponse>({
    url: URL,
    axios,
    onSuccess,
    onError,
  });
}
