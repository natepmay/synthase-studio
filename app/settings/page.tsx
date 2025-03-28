"use client";

import { z } from "zod";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(50, {
      message: "Display name must be 50 characters or fewer.",
    }),
  // role: z.enum(["learner", "teacher"], {
  //   message: "You must select an option.",
  // }),
});

export default function Settings() {
  const {
    register,
    formState: { isValid, errors },
    setError,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
    },
  });
  const { pending } = useFormStatus();

  return (
    <div className="w-full max-w-2xl bg-black p-20 rounded-2xl mt-10 mb-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Profile Settings
      </h1>
      <hr className="mt-5 mb-5" />

      <form>
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
            This is your public display name.
          </p>
          isValid? {isValid ? "true" : "false"}
          <p className="text-destructive text-sm">
            {errors.displayName?.message}
          </p>
        </div>
        <Button type="submit" disabled={pending}>
          Update
        </Button>
      </form>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Fill this in" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Change Password</FormLabel>
            <Button variant="outline" onClick={(e) => e.preventDefault()}>
              Change Password
            </Button>
            <FormDescription>A reset link will be sent to you.</FormDescription>
          </FormItem>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="learner">Learner</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How will you primarily use this app?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form> */}
    </div>
  );
}
