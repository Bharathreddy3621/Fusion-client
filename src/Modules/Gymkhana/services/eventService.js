import apiClient from "./apiClient";

export const getUpcomingEvents = async () => {
  const response = await apiClient.get("/upcoming_events/");
  return response.data;
};

export const getPastEvents = async () => {
  const response = await apiClient.get("/past_events/");
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await apiClient.put("/api/new_event/", eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateEvent = async (eventData) => {
  const response = await apiClient.put("/api/update_event/", eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const approveFICEvent = async (eventId) => {
  const response = await apiClient.put("/api/fic_approve_event/", {
    id: eventId,
  });
  return response.data;
};

export const approveCounsellorEvent = async (eventId) => {
  const response = await apiClient.put("/api/counsellor_approve_event/", {
    id: eventId,
  });
  return response.data;
};

export const approveDeanEvent = async (eventId) => {
  const response = await apiClient.put("/api/dean_approve_event/", {
    id: eventId,
  });
  return response.data;
};

export const rejectEvent = async (eventId) => {
  const response = await apiClient.put("/api/reject_event/", { id: eventId });
  return response.data;
};

export const getEventComments = async (eventId) => {
  const response = await apiClient.post("/api/list_event_comments/", {
    event_id: eventId,
  });
  return response.data;
};

export const addEventComment = async ({
  eventId,
  commentatorDesignation,
  comment,
}) => {
  const response = await apiClient.post("/api/create_event_comment/", {
    event_id: eventId,
    commentator_designation: commentatorDesignation,
    comment,
  });
  return response.data;
};
