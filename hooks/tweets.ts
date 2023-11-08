import { graphqlClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import {createTweetMutation} from "@/graphql/mutation/tweets"
import { getAllTweetsQuery } from "@/graphql/query/tweets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: (payload: any) => toast.loading("Creating Tweet", { id: "1" }),
    onSuccess: async (payload: any) => {
      await queryClient.invalidateQueries(["all-tweets"]);
      toast.success("Created Success", { id: "1" });
    },
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};