import {
  GET_REWARDS_SYSTEM_DATA,
  GET_SINGLE_REWARD,
  UPDATE_REWARD_POINTS,
} from "@/graphql/queries/rewards";
import apolloClient from "@/lib/apolloClient";
import React from "react";
import { toast } from "react-toastify";
import { create } from "zustand";
import "react-toastify/dist/ReactToastify.css";
const useRewardsStore = create((set, get) => ({
  error: null,
  loading: false,
  rewardsSystemData: [],
  singleReward: {},
  getRewardsSystemData: async ({ emailSearch, selectedRole, selectStatus }) => {
    set({ loading: true, error: null });
    console.log(emailSearch, selectedRole, selectStatus);
    try {
      const { data } = await apolloClient.query({
        query: GET_REWARDS_SYSTEM_DATA,
        fetchPolicy: "network-only",
        variables: {
          filter: {
            user: {
              email: {
                containsi: emailSearch,
              },
              role: {
                name: {
                  containsi: selectedRole,
                },
              },
              status: {
                startsWith: selectStatus,
              },
            },
          },
        },
      });

      set({ rewardsSystemData: data.rewards.data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
      toast.error(`Error: ${error.message}`);
      console.log(error);
    }
  },
  getSingleReward: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apolloClient.query({
        query: GET_SINGLE_REWARD,
        fetchPolicy: "network-only",
        variables: {
          id: id,
        },
      });
      set({ singleReward: data.reward.data || [], loading: false });
    } catch (error) {
      set({ error, loading: false });
      console.log(error);
    }
  },
  updateRewardPoints: async ({ id, points }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_REWARD_POINTS,
        fetchPolicy: "network-only",
        variables: {
          id: id,
          data: {
            points: points,
          },
        },
      });
      if (data.updateReward.data.id) {
        console.log(data.updateReward.data.id);
        await useRewardsStore.getState().getRewardsSystemData({
          emailSearch: "",
          selectedRole: "",
          selectStatus: "",
        });
        toast.success("Points updated successful");
      }
      return data;
    } catch (error) {
      set({ error, loading: false });
      toast.error(`Error: ${error.message}`);
      console.log(error);
    }
  },
}));

export default useRewardsStore;
