"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClientAction } from "@/actions/clients/createClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Client, ClientSchema } from "@/schemas/client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Separator } from "../ui/separator";
import { CountrySelect } from "./country-select";

export default function ClientForm() {
  const { push } = useRouter();

  const formRef = React.useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = React.useActionState(
    createClientAction,
    {
      success: false,
      message: "",
    },
  );

  const form = useForm<Client>({
    resolver: valibotResolver(ClientSchema),
    mode: "onTouched",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",

      ...((!state.success && state.fields) ?? {}),
    },
  });

  React.useEffect(() => {
    // NOTE: When passing an async server function to useActionState, the returned dispatch is not a Promise
    // Therefore we cannot just await it and then e.g. trigger toasts or else
    // https://github.com/vercel/next.js/discussions/67124
    // Alternatively we have to introduce an effect reacting to `state` in order to trigger toasts accordingly
    // https://github.com/vercel/next.js/discussions/65681

    if (state.success) {
      toast.success(`Client created: ${state.result.firstname}`);

      push("/clients");

      return;
    }

    if (state.message === "") {
      return;
    }

    toast.error(`Client creation failed: ${state.message || ""}`);
  }, [push, state]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        className={cn(
          "grid max-w-6xl gap-12 transition-opacity",
          isPending && "pointer-events-none cursor-not-allowed opacity-50",
        )}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            React.startTransition(async () => {
              // NOTE: When passing an async server function to useActionState, the returned dispatch is not a Promise
              // Therefore we cannot just await it and then e.g. trigger toasts or else
              formAction(new FormData(formRef.current!));

              // NOTE: We could just call the action directly, but then we lose the return value from our server function
              // That means calling `state.success` in our render function will do nothing,
              // as `state` will stay at its default value

              // NOTE: Leaving the following code block just for documentation
              // const result = await createClientAction(
              //   { success: false, message: "" },
              //   new FormData(formRef.current!),
              // );

              // if (result.success) {
              //   toast.success("Client created");
              //   router.push("/clients");
              //   return
              // }
              //
              // toast.error(`Client creation failed: ${result.message}`);
            });
          })(evt);
        }}
      >
        <FormGroup
          title="Client details"
          description="Mandatory information about your client"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="lg:col-span-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>

        <Separator />

        <FormGroup title="Client background">
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem className="lg:col-span-full">
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <CountrySelect {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Birthdate</FormLabel>
                <FormControl>
                  <Input type="date" trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthplace"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Birthplace</FormLabel>
                <FormControl>
                  <CountrySelect {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>

        <Separator />

        <FormGroup title="Client address">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="lg:col-span-full">
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input type="text" trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>

        <Separator />

        <FormGroup title="Client contact">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="lg:col-span-full">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="text" trimValueOnBlur {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>

        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" asChild>
            <Link href="/clients">Cancel</Link>
          </Button>
          <Button type="submit">Create client</Button>
        </div>
      </form>

      {/* TODO: Success and error with toast notifications */}
      {state.success && <div className="text-green-500">Client created</div>}

      {!state.success && state.message !== "" && !state.issues && (
        <div className="text-destructive-foreground">
          {state.message || "Client could not be created"}
        </div>
      )}

      {!state.success && state.issues && (
        <div className="text-destructive-foreground">
          <ul>
            {state.issues.map((issue, idx) => (
              <li key={idx} className="flex gap-1">
                <XMarkIcon />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}

type FormGroupProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
};

function FormGroup(props: FormGroupProps) {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <div className="grid gap-2">
        <div className="font-medium">{props.title}</div>

        {props.description && (
          <FormDescription>{props.description}</FormDescription>
        )}
      </div>

      <div className="grid grid-cols-subgrid gap-y-4 lg:col-span-2">
        {props.children}
      </div>
    </div>
  );
}
