'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@components/ui/textarea';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

const movieFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  overview: z.string().optional(),
  releaseDate: z.date({
    required_error: 'A release date is required.',
  }),
  rating: z.coerce.number().min(0).max(10).optional(),
  posterPath: z.string().url().optional(),
  backdropPath: z.string().url().optional(),
  status: z.enum(['WATCHED', 'WATCHLIST', 'PLAN_TO_WATCH']),
});

type MovieFormValues = z.infer<typeof movieFormSchema>;

interface MovieFormProps {
  initialData?: Partial<MovieFormValues>;
  onSubmit: (data: MovieFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function MovieForm({ initialData, onSubmit, isLoading = false }: MovieFormProps) {
  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: initialData || {
      title: '',
      overview: '',
      rating: 0,
      status: 'WATCHLIST',
    },
  });

  async function handleSubmit(data: MovieFormValues) {
    try {
      await onSubmit(data);
      toast({
        title: 'Success!',
        description: initialData ? 'Movie updated successfully.' : 'Movie added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Movie title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Release Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Movie plot summary" className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Movie' : 'Add Movie'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
