import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePrices } from "@/hooks/usePrices";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import { CurrencyCombobox } from "./CurrencyCombobox";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../custom/ErrorMessage";
import { calculateToAmount } from "@/lib/utils";
import React from "react";

const currencySwapSchema = z.object({
  fromCurrency: z.string().min(1, "Required"),
  toCurrency: z.string().min(1, "Required"),
  fromAmount: z
    .string()
    .min(1, "Required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Must be a positive number",
    }),
});

type FormValues = z.infer<typeof currencySwapSchema>;

export function CurrencySwapForm() {
  const { data, isLoading, error } = usePrices();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(currencySwapSchema),
    defaultValues: {
      fromAmount: "",
      fromCurrency: "",
      toCurrency: "",
    },
  });

  const [toAmount, setToAmount] = React.useState<string>("");

  const handleSwap = () => {
    const prevFrom = getValues("fromCurrency");
    const prevTo = getValues("toCurrency");

    setValue("fromCurrency", prevTo);
    setValue("toCurrency", prevFrom);
  };

  const onSubmit = (values: FormValues) => {
    console.log("✅ Submitted:", values);

    const fromCurrency = values.fromCurrency;
    const toCurrency = values.toCurrency;
    const fromAmount = values.fromAmount;
    console.log(
      "🚀 ~ onSubmit ~ data?.find((c) => c.currency === fromCurrency)?.price :",
      data?.find((c) => c.currency === fromCurrency)?.price,
      data?.find((c) => c.currency === toCurrency)?.price
    );

    const toAmount = calculateToAmount({
      fromAmount,
      fromCurrency: data?.find((c) => c.currency === fromCurrency)?.price || 1,
      toCurrency: data?.find((c) => c.currency === toCurrency)?.price || 1,
    });

    setToAmount(toAmount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen md:container">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4 md:container">
        Failed to load prices.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 md:container">
      <Card className="w-full max-w-xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Currency Swap</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* From Field */}
            <div className="space-y-2">
              <Label>From</Label>
              <div className="flex space-x-2">
                <Controller
                  control={control}
                  name="fromCurrency"
                  render={({ field }) => (
                    <div className="w-full">
                      <CurrencyCombobox
                        currencies={data || []}
                        onChange={(value) => field.onChange(value.currency)}
                        value={field.value}
                        isInvalid={!!errors.fromCurrency}
                      />
                      {errors.fromCurrency && (
                        <ErrorMessage>
                          {errors.fromCurrency?.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name="fromAmount"
                  render={({ field }) => (
                    <div className="w-full">
                      <Input
                        placeholder="Amount"
                        {...field}
                        aria-invalid={!!errors.fromAmount}
                      />

                      {errors.fromAmount && (
                        <ErrorMessage>{errors.fromAmount.message}</ErrorMessage>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center m-0">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSwap}
              >
                <ArrowLeftRight className="h-5 w-5" />
              </Button>
            </div>

            {/* To Field */}
            <div className="space-y-2">
              <Label>To</Label>
              <div className="flex space-x-2">
                <Controller
                  control={control}
                  name="toCurrency"
                  render={({ field }) => (
                    <div className="w-full">
                      <CurrencyCombobox
                        currencies={data || []}
                        onChange={(value) => field.onChange(value.currency)}
                        value={field.value}
                        triggerClassName="w-full"
                        isInvalid={!!errors.toCurrency}
                      />

                      {errors.toCurrency && (
                        <ErrorMessage>
                          {errors.toCurrency?.message}
                        </ErrorMessage>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* To currency result */}
            {toAmount && (
              <div className="text-center">
                <div className="bg-green-100 text-green-800 font-semibold px-4 py-3 rounded-lg border border-green-300 shadow-sm inline-block">
                  ≈ {toAmount} {getValues("toCurrency")}
                </div>
              </div>
            )}

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
