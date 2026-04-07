import apiClient from "./apiClient";

export const getClubMembers = async (clubName) => {
  const response = await apiClient.post("/api/members_records/", {
    club_name: clubName,
  });
  return response.data;
};

export const approveMember = async (memberId) => {
  const response = await apiClient.post("/api/member_approve/", {
    id: memberId,
  });
  return response.data;
};

export const rejectMember = async (memberId) => {
  const response = await apiClient.post("/api/member_reject/", {
    id: memberId,
  });
  return response.data;
};

export const requestMembership = async (memberData) => {
  const response = await apiClient.post("/api/club_membership/", memberData);
  return response.data;
};
