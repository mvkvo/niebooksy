"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarProps, EventInputProps, EventProps } from "./models";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { format } from "date-fns";

export const Calendar = ({ userId }: CalendarProps) => {
  const [events, setEvents] = useState<EventInputProps[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventTitleInputValue, setEventTitleInputValue] = useState("");
  const [eventDescriptionInputValue, setEventDescriptionInputValue] =
    useState("");
  const [startEventTime, setStartEventTime] = useState("");
  const [endEventTime, setEndEventTime] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Błąd pobierania wydarzeń");
        }

        const data = await res.json();
        console.log(data);
        if (data) {
          data.map((row: EventProps) => {
            setEvents((prevEvents) => [
              ...prevEvents,
              {
                title: row.title,
                description: row.description,
                start: row.start.toString(),
                end: row.end.toString(),
              },
            ]);
          });
        }
      } catch (error) {
        console.error("Błąd pobierania:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventDescriptionInputValue,
          description: eventDescriptionInputValue,
          start: startEventTime,
          end: endEventTime,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEvents((prevEvents) => [
        ...prevEvents,
        {
          title: eventTitleInputValue,
          description: eventDescriptionInputValue,
          start: startEventTime,
          end: endEventTime,
        },
      ]);

      console.log("Event added", response);
      alert("Event added");
    } catch (error) {
      console.error("Failed:", error);
      alert("Event Failed");
    }

    setModalOpen(false);
  };

  const handleSelect = (selectInfo: { start: Date; end: Date }) => {
    console.log("start:", selectInfo.start);
    console.log(
      "start formated:",
      format(selectInfo.start, "yyyy-MM-dd HH:mm:ss")
    );
    setStartEventTime(format(selectInfo.start, "yyyy-MM-dd HH:mm:ss"));
    setEndEventTime(format(selectInfo.end, "yyyy-MM-dd HH:mm:ss"));
    setModalOpen(true);
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <div>
        <strong>{eventInfo.event.title}</strong>
        {eventInfo.event.extendedProps.description && (
          <div
            style={{
              fontSize: "0.8em",
              marginTop: 8,
              borderTop: "1px solid #FFFFFF",
              marginRight: 12,
            }}
          >
            {eventInfo.event.extendedProps.description}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        locale="pl"
        timeZone="local"
        allDaySlot={false}
        selectable={true}
        select={handleSelect}
        events={events}
        eventContent={renderEventContent}
        height="auto"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        slotMinTime="08:00:00" // <--- Od której godziny wyświetla
        slotMaxTime="22:00:00" // <--- Do której godziny wyświetla
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: false, // <-- 24h format (00:00 zamiast 12AM/PM)
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Dodaj wydarzenie"
      >
        <form
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          onSubmit={handleSubmit}
        >
          <input
            name="event-title"
            id="event-title"
            type="text"
            placeholder="Tytuł wydarzenia"
            value={eventTitleInputValue}
            onChange={(e) => setEventTitleInputValue(e.target.value)}
          />
          <textarea
            id="event-description"
            name="event-description"
            value={eventDescriptionInputValue}
            onChange={(e) => setEventDescriptionInputValue(e.target.value)}
          />
          <button type="submit">Zapisz</button>
        </form>
      </Modal>
    </>
  );
};
