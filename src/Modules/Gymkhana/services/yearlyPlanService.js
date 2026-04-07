import apiClient from "./apiClient";

export const getYearlyPlans = async () => {
  const response = await apiClient.get("/api/yearly-plans/");
  return response.data;
};

export const getClubwiseYearlyPlans = async () => {
  const response = await apiClient.get("/api/clubwise_yearly_plan/");
  return response.data;
};

export const uploadYearlyPlan = async (formData) => {
  const response = await apiClient.post(
    "/api/upload_yearly_plan_excel/",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const approveFICYearlyPlan = async (planId) => {
  const response = await apiClient.put("/api/fic_approve_yearly_plan/", {
    id: planId,
  });
  return response.data;
};

export const approveCounsellorYearlyPlan = async (planId) => {
  const response = await apiClient.put("/api/counsellor_approve_yearly_plan/", {
    id: planId,
  });
  return response.data;
};

export const approveDeanYearlyPlan = async (planId) => {
  const response = await apiClient.put("/api/dean_approve_yearly_plan/", {
    id: planId,
  });
  return response.data;
};

export const rejectYearlyPlan = async (planId) => {
  const response = await apiClient.put("/api/reject_yearly_plan/", {
    id: planId,
  });
  return response.data;
};
