"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/utils/validationSchema";

type issueForm = z.infer<typeof createIssueSchema>;

const Page = () => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<issueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  return (
    <div className="max-w-xl space-y-3">
      {err && (
        <Callout.Root>
          <Callout.Text>{err}</Callout.Text>{" "}
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            // set a generic error message
            setErr("There was an error submitting the form.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text className="text-red-500" as="p">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text className="text-red-500" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default Page;
