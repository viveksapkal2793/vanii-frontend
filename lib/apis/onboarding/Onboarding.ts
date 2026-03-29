import { OnboardingFormSchema } from "@/app/onboarding/components/formschema";
import { PostApiInput } from "@/types/api";
import { PostApi } from "../PostApi";
import { z } from "zod";

const URL = "/api/v1/user/post-onboarding";

export async function PostOnboarding({
  axios,
  data,
  onSuccess,
  onError,
}: Omit<PostApiInput<void, z.infer<typeof OnboardingFormSchema>>, "url">) {
  await PostApi<void, z.infer<typeof OnboardingFormSchema>>({
    url: URL,
    axios,
    data,
    onSuccess,
    onError,
  });
}
