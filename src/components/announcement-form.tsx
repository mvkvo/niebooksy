"use client";

import { AnnouncementFormSchema, FormState } from "@lib/definitions";
import { useActionState } from "react";
import { useSession } from "next-auth/react";

export const AnnouncementForm = () => {
  const [state, action, pending] = useActionState(addAnnouncement, undefined);
  const { data: session } = useSession();
  const user_id = session?.user.id;

  async function addAnnouncement(state: FormState, formData: FormData) {
    const title = formData.get("title");
    const content = formData.get("content");

    const validatedFields = AnnouncementFormSchema.safeParse({
      content,
    });
    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, title, content }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Process response here
      console.log("Announcement added", response);
      alert("Announcement added");
    } catch (error) {
      console.error("Failed:", error);
      alert("Announcement Failed");
    }
  }

  return (
    <form action={action}>
      <h3>Dodaj ogłoszenie</h3>
      <div>
        <label htmlFor="title">Tytuł ogłoszenia</label>
        <input id="title" name="title" />
      </div>
      <div>
        <label htmlFor="email">Tekst ogłoszenia</label>
        <textarea id="content" name="content" />
      </div>
      {state?.errors?.content && <p>{state.errors.content}</p>}
      <button disabled={pending} type="submit">
        Dodaj
      </button>
    </form>
  );
};

export default AnnouncementForm;
