import apiClient from "./apiClient";

export const getUpcomingBudgets = async () => {
  const response = await apiClient.get("/budget/");
  return response.data;
};

export const createBudget = async (budgetData) => {
  const response = await apiClient.put("/api/new_budget/", budgetData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBudget = async (budgetId, budgetData) => {
  const response = await apiClient.put("/api/update_budget/", {
    id: budgetId,
    ...budgetData,
  });
  return response.data;
};

export const approveFICBudget = async (budgetId) => {
  const response = await apiClient.put("/api/fic_approve_budget/", {
    id: budgetId,
  });
  return response.data;
};

export const approveCounsellorBudget = async (budgetId) => {
  const response = await apiClient.put("/api/counsellor_approve_budget/", {
    id: budgetId,
  });
  return response.data;
};

export const approveDeanBudget = async (budgetId) => {
  const response = await apiClient.put("/api/dean_approve_budget/", {
    id: budgetId,
  });
  return response.data;
};

export const reviewDeanBudget = async (budgetId) => {
  const response = await apiClient.put("/api/dean_review_budget/", {
    id: budgetId,
  });
  return response.data;
};

export const rejectBudget = async (budgetId) => {
  const response = await apiClient.put("/api/reject_budget/", { id: budgetId });
  return response.data;
};

export const getBudgetComments = async (budgetId) => {
  const response = await apiClient.post("/api/list_budget_comments/", {
    budget_id: budgetId,
  });
  return response.data;
};

export const addBudgetComment = async ({
  budgetId,
  commentatorDesignation,
  comment,
}) => {
  const response = await apiClient.post("/api/create_budget_comment/", {
    budget_id: budgetId,
    commentator_designation: commentatorDesignation,
    comment,
  });
  return response.data;
};
