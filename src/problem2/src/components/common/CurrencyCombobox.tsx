import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ICurrency } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  currencies: ICurrency[];
  onChange?: (currency: ICurrency) => void;
  value?: string | null;
  triggerClassName?: string;
  isInvalid?: boolean;
};

const getCurrencyIconUrl = (symbol: string) => `/assets/tokens/${symbol}.svg`;
const getCurrencyPrice = (currencies: ICurrency[], value: string) => {
  return ` (${(
    currencies.find((c) => c.currency === value)?.price || 0
  ).toFixed(2)})$`;
};

export function CurrencyCombobox({
  currencies,
  onChange,
  value,
  triggerClassName,
  isInvalid,
}: Props) {
  const [open, setOpen] = useState(false);

  const onSelect = (currency: ICurrency) => {
    if (onChange) {
      onChange(currency);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-invalid={isInvalid}
          className={cn("w-full justify-between", triggerClassName)}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={getCurrencyIconUrl(value)}
                  alt={value}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/assets/tokens/default.svg";
                  }}
                />
                <AvatarFallback>{value.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {value}
              {getCurrencyPrice(currencies, value)}
            </div>
          ) : (
            <span>Select currency</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.currency}
                  value={currency.currency}
                  onSelect={() => {
                    onSelect(currency);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src={getCurrencyIconUrl(currency.currency)}
                        alt={currency.currency}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/tokens/default.svg";
                        }}
                      />
                      <AvatarFallback>
                        {currency.currency.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {currency.currency}
                    {` (${currency.price.toFixed(2)})$`}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
