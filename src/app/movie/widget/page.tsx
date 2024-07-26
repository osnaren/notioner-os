"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import { createRequest } from "@utils/api";

import { Button } from "@cui/components/ui/button";
import { Input } from "@cui/components/ui/input";
import { Checkbox } from "@cui/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@cui/components/ui/hover-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@cui/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@cui/components/ui/card";

import { ReloadIcon } from "@radix-ui/react-icons";
import { MdOutlineMovieFilter, MdOutlineInfo } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { TbEyeSearch } from "react-icons/tb";

const movieFormSchema = z.object({
  title: z.string().min(3, {
    message: "Movie name must be at least 3 characters.",
  }),
  year: z.string().regex(/^\d{4}$/, {
    message: "Year must be a 4-digit number.",
  }),
  watched: z.boolean().default(false),
});

/**
 * Represents a movie widget component.
 * This component allows users to add a new movie to the Notion CineScape.
 */
const MovieWidget: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      year: "",
      watched: false,
    },
    reValidateMode: "onBlur",
    mode: "onSubmit",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Submits the form data to the server to add a new movie.
   *
   * @param {z.infer<typeof movieFormSchema>} data - The form data containing the movie title and year.
   * @return {void} This function does not return anything.
   */
  const onSubmit = (data: z.infer<typeof movieFormSchema>): void => {
    setIsSubmitting(true);
    createRequest("post", "/api/movie/write", data)
      .then(() => {
        toast.success("Movie added successfully!");
      })
      .catch(() => {
        toast.error("Failed to add movie.");
      })
      .finally(() => {
        form.reset();
        form.clearErrors();
        setIsSubmitting(false);
      });
  };

  /**
   * Renders a HoverCard component with an info icon and a description.
   */
  const HoverInfo = () => {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <MdOutlineInfo />
        </HoverCardTrigger>
        <HoverCardContent className="font-mono font-light text-sm" side="right">
          Enter the title and year of the movie. We&lsquo;ll add it to the Notion CineScape.
        </HoverCardContent>
      </HoverCard>
    );
  };

  /**
   * Renders a form for adding a new movie.
   */
  const MovieForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MdOutlineMovieFilter size={20} /> Movie Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <BsCalendarDate size={16} /> Year
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Release Year ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="watched"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="flex items-center gap-2 mt-2">
                  <TbEyeSearch size={20} /> Watched?
                </FormLabel>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="gap-2" disabled={isSubmitting || !form.formState.isValid}>
            {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <Card className="w-[350px] m-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          Add Movie
          <HoverInfo />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MovieForm />
      </CardContent>
    </Card>
  );
};

export default MovieWidget;
