"use client";
import { env } from "../env";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";

interface PricingPackage {
  id: number;
  name: string;
  fromPrice: string;
  idealFor: string;
  features: string[];
  highlighted?: boolean;
  offerPrice?: string;
  offerLabel?: string;
}

interface ContactProps {
  defaultService?: string;
  defaultPackage?: string;
  servicePricing?: Record<string, { name: string; packages: PricingPackage[] }>;
}

const formSchema = z.object({
  service: z.string().min(1, { message: "Please select a service." }),
  package: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.string().trim().min(1, {
    message: "Phone number is required.",
  }),
  postcode: z
    .string()
    .trim()
    .min(5, {
      message: "Postcode must be at least 5 characters.",
    })
    .max(7, {
      message: "Postcode must not contain more than 7 characters.",
    }),
  date: z.date(),
  message: z.string().optional(),
});

export function Contact({
  defaultService = "",
  defaultPackage = "",
  servicePricing = {},
}: ContactProps) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isDatePopoverOpen, setIsDatePopoverOpen] = React.useState(false);
  const [weatherByDay, setWeatherByDay] = React.useState<Record<string, number>>(
    {},
  );
  const hasRequestedWeatherRef = React.useRef(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: defaultService,
      package: defaultPackage,
      name: "",
      email: "",
      phone: "",
      postcode: "",
      date: new Date(),
      message: "",
    },
  });

  const watchedService = form.watch("service");
  const packageOptions = watchedService
    ? servicePricing[watchedService]?.packages ?? []
    : [];

  React.useEffect(() => {
    if (defaultService) {
      form.setValue("service", defaultService);
    }
  }, [defaultService, form]);

  React.useEffect(() => {
    form.setValue("package", defaultPackage);
  }, [defaultPackage, form]);

  async function handleSubmit(formData: z.infer<typeof formSchema>) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_API_KEY,
        ...formData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit the form. Please try again.");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message ?? "Something went wrong while submitting.");
    }

    return result;
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await handleSubmit(data);
      toast.success("Form submitted successfully.");
      form.reset({
        service: "",
        package: "",
        name: "",
        email: "",
        phone: "",
        postcode: "",
        date: new Date(),
        message: "",
      });
      setDate(new Date());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit the form. Please try again.";
      toast.error(message);
    }
  }

  const getWeatherCodeForDate = React.useCallback(
    (day: Date) => weatherByDay[format(day, "yyyy-MM-dd")],
    [weatherByDay],
  );

  const getWeatherIcon = React.useCallback((weatherCode?: number) => {
    if (weatherCode === undefined) {
      return null;
    }

    if (weatherCode === 0) {
      return <Sun className="h-3.5 w-3.5 text-amber-500" aria-hidden />;
    }

    if (weatherCode === 1 || weatherCode === 2) {
      return <CloudSun className="h-3.5 w-3.5 text-sky-500" aria-hidden />;
    }

    if (weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
      return <Cloud className="h-3.5 w-3.5 text-slate-500" aria-hidden />;
    }

    if (
      weatherCode === 51 ||
      weatherCode === 53 ||
      weatherCode === 55 ||
      weatherCode === 56 ||
      weatherCode === 57 ||
      weatherCode === 61 ||
      weatherCode === 63 ||
      weatherCode === 65 ||
      weatherCode === 66 ||
      weatherCode === 67 ||
      weatherCode === 80 ||
      weatherCode === 81 ||
      weatherCode === 82
    ) {
      return <CloudRain className="h-3.5 w-3.5 text-blue-600" aria-hidden />;
    }

    if (
      weatherCode === 71 ||
      weatherCode === 73 ||
      weatherCode === 75 ||
      weatherCode === 77 ||
      weatherCode === 85 ||
      weatherCode === 86
    ) {
      return <CloudSnow className="h-3.5 w-3.5 text-cyan-600" aria-hidden />;
    }

    if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      return (
        <CloudLightning className="h-3.5 w-3.5 text-violet-600" aria-hidden />
      );
    }

    return <CloudFog className="h-3.5 w-3.5 text-slate-500" aria-hidden />;
  }, []);

  const loadWeatherForecast = React.useCallback(async () => {
    if (!navigator.geolocation || hasRequestedWeatherRef.current) {
      return;
    }

    hasRequestedWeatherRef.current = true;

    const getPosition = () =>
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 1000 * 60 * 15,
        });
      });

    try {
      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&forecast_days=10&timezone=auto`,
      );

      if (!response.ok) {
        return;
      }

      const data: {
        daily?: { time?: string[]; weather_code?: number[] };
      } = await response.json();

      const times = data.daily?.time;
      const weatherCodes = data.daily?.weather_code;

      if (!times || !weatherCodes) {
        return;
      }

      const nextWeatherByDay = times.reduce<Record<string, number>>(
        (acc, day, index) => {
          const code = weatherCodes[index];
          if (code !== undefined) {
            acc[day] = code;
          }
          return acc;
        },
        {},
      );

      setWeatherByDay(nextWeatherByDay);
    } catch {
      // Ignore permission/network failures and preserve default calendar UX.
    }
  }, []);

  React.useEffect(() => {
    if (!isDatePopoverOpen) {
      return;
    }

    void loadWeatherForecast();
  }, [isDatePopoverOpen, loadWeatherForecast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Service <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("package", "");
                }}
              >
                <FormControl>
                  <SelectTrigger className="bg-neutral-200 border-neutral-300">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-neutral-200 border-neutral-300">
                  {Object.entries(servicePricing).map(([slug, { name }]) => (
                    <SelectItem key={slug} value={slug}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {packageOptions.length > 0 && (
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-neutral-200 border-neutral-300">
                      <SelectValue placeholder="Select a package (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-neutral-200 border-neutral-300">
                    {packageOptions.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.name}>
                        {pkg.name} — from {pkg.offerPrice ?? pkg.fromPrice}
                        {pkg.offerPrice && (
                          <span className="ml-1 text-neutral-400 line-through">{pkg.fromPrice}</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-neutral-200" placeholder="Name" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-neutral-200" type="email" placeholder="Email" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone number <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-neutral-200" placeholder="Phone number" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Postcode of Flight location <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input className="bg-neutral-200" placeholder="Postcode of Flight Location" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Date <span className="text-red-500">*</span>
              </FormLabel>
              <br />
              <FormControl>
                {/* <Input placeholder="shadcn"  /> */}
                <Popover
                  open={isDatePopoverOpen}
                  onOpenChange={setIsDatePopoverOpen}
                  {...field}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-neutral-200 border-neutral-300",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2 bg-neutral-200 border-neutral-300"
                  >
                    <Select
                      onValueChange={(value) => {
                        const nextDate = addDays(new Date(), parseInt(value, 10));
                        setDate(nextDate);
                        field.onChange(nextDate);
                      }}
                    >
                      <SelectTrigger className="bg-neutral-200 border-neutral-300">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-neutral-200 border-neutral-300">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border border-neutral-300 bg-neutral-200 p-2">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(nextDate) => {
                          if (!nextDate) {
                            return;
                          }

                          setDate(nextDate);
                          field.onChange(nextDate);
                        }}
                        classNames={{
                          day: cn(
                            "h-12 w-10 p-0 font-normal aria-selected:opacity-100",
                            Object.keys(weatherByDay).length === 0 && "h-8 w-8",
                          ),
                        }}
                        components={{
                          DayContent: ({ date: day }) => {
                            const weatherCode = getWeatherCodeForDate(day);
                            const icon = getWeatherIcon(weatherCode);

                            if (!icon) {
                              return <span>{format(day, "d")}</span>;
                            }

                            return (
                              <div className="flex h-full w-full flex-col items-center justify-center leading-none">
                                <span>{format(day, "d")}</span>
                                <span className="mt-0.5">{icon}</span>
                              </div>
                            );
                          },
                        }}
                        className="bg-neutral-200"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea className="bg-neutral-200" placeholder="Message (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
