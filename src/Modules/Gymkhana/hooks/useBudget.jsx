import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import apiClient from "../services/apiClient";

// Fetch upcoming budgets
export const useUpcomingBudgets = () => {
  return useQuery({
    queryKey: ["upcomingBudgets"],
    queryFn: async () => {
      const response = await apiClient.get("/budget/");
      return response.data;
    },
  });
};

// Fetch budget comments
export const useBudgetComments = (budgetId) => {
  return useQuery({
    queryKey: ["budgetComments", budgetId],
    queryFn: async () => {
      const response = await apiClient.post("/api/list_budget_comments/", {
        budget_id: budgetId,
      });
      return response.data;
    },
    enabled: !!budgetId,
  });
};

// Create budget
export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetData) => {
      const response = await apiClient.put("/api/new_budget/", budgetData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Success",
        message: "Budget created successfully",
        color: "green",
      });
    },
  });
};

// Update budget
export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetData) => {
      const response = await apiClient.put("/api/update_budget/", budgetData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Success",
        message: "Budget updated successfully",
        color: "green",
      });
    },
  });
};

// Approve budget by FIC
export const useApproveFICBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId) => {
      const response = await apiClient.put("/api/fic_approve_budget/", {
        id: budgetId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Approved",
        message: "Budget approved by FIC",
        color: "green",
      });
    },
  });
};

// Approve budget by Counsellor
export const useApproveCounsellorBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId) => {
      const response = await apiClient.put("/api/counsellor_approve_budget/", {
        id: budgetId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Approved",
        message: "Budget approved by Counsellor",
        color: "green",
      });
    },
  });
};

// Approve budget by Dean
export const useApproveDeanBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId) => {
      const response = await apiClient.put("/api/dean_approve_budget/", {
        id: budgetId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Approved",
        message: "Budget approved by Dean",
        color: "green",
      });
    },
  });
};

// Review budget by Dean
export const useReviewDeanBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId) => {
      const response = await apiClient.put("/api/dean_review_budget/", {
        id: budgetId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Reviewed",
        message: "Budget sent back for review",
        color: "orange",
      });
    },
  });
};

// Reject budget
export const useRejectBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budgetId) => {
      const response = await apiClient.put("/api/reject_budget/", {
        id: budgetId,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingBudgets"]);
      notifications.show({
        title: "Rejected",
        message: "Budget rejected",
        color: "red",
      });
    },
  });
};

// Add budget comment
export const useAddBudgetComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ budgetId, commentatorDesignation, comment }) => {
      const response = await apiClient.post("/api/create_budget_comment/", {
        budget_id: budgetId,
        commentator_designation: commentatorDesignation,
        comment,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["budgetComments", variables.budgetId]);
      notifications.show({
        title: "Success",
        message: "Comment added",
        color: "green",
      });
    },
  });
};
