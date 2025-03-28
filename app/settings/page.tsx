"use client";

import { z } from "zod";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { settingsFormSchema } from "@/lib/validation";
import { updateSettings, type State } from "@/lib/actions";
import { ChevronDown } from "lucide-react";

export default function Settings() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof settingsFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      displayName: "",
      role: undefined,
    },
  });
  const { pending } = useFormStatus();
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateSettings, initialState);

  useEffect(() => {
    if (!state) {
      return;
    }
    console.log(state);
    if (!!state.errors) {
      Object.entries(state.errors).forEach(([name, errs]) => {
        errs.forEach((err) =>
          setError(name as keyof State["errors"], { message: err })
        );
      });
      console.log(state.errors);
    } else {
      alert("Success! " + state.message);
    }
  }, [state, setError, reset]);

  return (
    <div className="w-full max-w-2xl bg-black p-20 rounded-2xl mt-10 mb-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Profile Settings
      </h1>
      <hr className="mt-5 mb-5" />

      <form
        action={formAction}
        onSubmit={(e) => {
          if (!isValid) {
            e.preventDefault();
          }
        }}
      >
        {/* Display Name */}
        <div className="grid gap-2">
          <label
            htmlFor="displayName"
            data-error={!!errors.displayName}
            className="data-[error=true]:text-destructive"
          >
            Display Name
          </label>
          <Input
            id="displayName"
            placeholder="Fill this in"
            aria-describedby="display-desc"
            aria-invalid={!!errors.displayName}
            {...register("displayName")}
          ></Input>
          <p id="display-desc" className="text-muted-foreground text-sm">
            This is how we&apos;ll refer to you in the app.
          </p>
          <p className="text-destructive text-sm">
            {errors.displayName?.message}
          </p>
        </div>

        {/* Role */}
        <div className="grid gap-2">
          <label
            htmlFor="role"
            data-error={!!errors.role}
            className="data-[error=true]:text-destructive"
          >
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              aria-describedby="role-desc"
              aria-invalid={!!errors.role}
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${
                errors.role ? "border-destructive ring-destructive" : ""
              }`}
              {...register("role")}
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="teacher">Teacher</option>
              <option value="learner">Learner</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </div>
          </div>
          <p id="role-desc" className="text-muted-foreground text-sm">
            How will you primarily use this app?
          </p>
          <p className="text-destructive text-sm">{errors.role?.message}</p>
        </div>

        {/* Leitmotif */}
        {/* TODO use watch to play the next sound when it's picked from the dropdown */}
        <div className="grid gap-2">
          <label
            htmlFor="leitmotif"
            data-error={!!errors.leitmotif}
            className="data-[error=true]:text-destructive"
          >
            Leitmotif
          </label>
          <div className="relative">
            <select
              id="leitmotif"
              aria-describedby="leitmotif-desc"
              aria-invalid={!!errors.leitmotif}
              className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none ${
                errors.leitmotif ? "border-destructive ring-destructive" : ""
              }`}
              {...register("leitmotif")}
            >
              <option value="" disabled>
                Select a leitmotif
              </option>
              <option value="none">None</option>
              <option value="one">One</option>
              <option value="two">Two</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown />
            </div>
          </div>
          <p id="leitmotif-desc" className="text-muted-foreground text-sm">
            A sound that follows you around the app 🤗
          </p>
          <p className="text-destructive text-sm">
            {errors.leitmotif?.message}
          </p>
        </div>

        <Button type="submit" disabled={pending || !isValid}>
          Update
        </Button>
      </form>

      <hr className="mt-5 mb-5" />

      <Button onSubmit={(e) => e.preventDefault()} variant="outline">
        Change Password
      </Button>
    </div>
  );
}
