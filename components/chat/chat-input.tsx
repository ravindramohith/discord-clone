"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
interface ChatInputProps {
  apiUrl: string;
  name: string;
  query: Record<string, any>;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ apiUrl, name, query, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        qs.stringifyUrl({ url: apiUrl, query }),
        {
          content: value.content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
