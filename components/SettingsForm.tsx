'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { updateUserTheme } from '@/actions/user';
import { useState } from 'react';
import { User } from '@prisma/client';

const formSchema = z.object({
  theme: z.string({
    required_error: 'Please select a theme to apply.',
  }),
});

type SettingsFormProps = {
  data?: User | null;
};

export default function SettingsForm({ data }: SettingsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: data?.theme ?? '',
    },
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await updateUserTheme(data);

    toast({
      title: 'Changes saved successfully.',
    });

    setIsLoading(false);
    setIsChanged(false);
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setIsChanged(value !== data?.theme);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zinc">Zinc</SelectItem>
                    <SelectItem value="rose">Rose</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5 flex justify-end">
            <Button type="submit" disabled={isLoading || !isChanged}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
