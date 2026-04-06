import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import * as eventService from "../services/eventService";

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: eventService.getUpcomingEvents,
  });
};

export const usePastEvents = () => {
  return useQuery({
    queryKey: ["pastEvents"],
    queryFn: eventService.getPastEvents,
  });
};

export const useEventComments = (eventId) => {
  return useQuery({
    queryKey: ["eventComments", eventId],
    queryFn: () => eventService.getEventComments(eventId),
    enabled: !!eventId,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingEvents"]);
      notifications.show({
        title: "Success",
        message: <Text fz="sm">Event created successfully</Text>,
        color: "green",
      });
    },
  });
};
