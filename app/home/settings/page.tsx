'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@clerk/nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { updateUserTheme } from '@/actions/user';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  theme: z.string({
    required_error: 'Please select a theme to apply.',
  }),
});

export default function SettingsPage() {
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const emailData = user?.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId,
  );

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await updateUserTheme(data);

    toast({
      title: 'Changes saved successfully.',
    });

    setIsLoading(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex gap-y-3 items-center justify-between">
        <h1 className="font-bold text-2xl md:text-4xl">Settings</h1>
      </div>

      <p className="text-xs max-w-[50rem] md:text-sm">
        Manage your account details here. You can also change the theme of your
        account.
      </p>

      <div className="max-w-[40rem] space-y-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            disabled
            value={emailData?.emailAddress ?? ''}
            className="mt-1.5"
          />
        </div>

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
                      onValueChange={field.onChange}
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
