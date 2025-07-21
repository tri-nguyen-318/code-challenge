import React, { useMemo } from "react";

// ! Some import/types in this is just for mocking purposes

interface WalletBalance {
  currency: string;
  amount: number;
  // ! Missing blockchain field in WalletBalance
  blockchain: string;
}

// ! this interface should extends from WalletBalance, it loss the blockchain field
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type BoxProps = {};

const WalletRow = () => {};

const useWalletBalances = (): WalletBalance[] => {
  return [];
};
const usePrices = () => {};

interface Props extends BoxProps {}

const classes = {
  row: "flex",
};

const WalletPage: React.FC<Props> = (props: Props) => {
  // ! children prop is not used, should be removed or utilized
  const balances = useWalletBalances();
  const prices = usePrices();

  // ! blockchain here should be string
  const getPriority = (blockchain: string): number => {
    // switch (blockchain) {
    //   case "Osmosis":
    //     return 100;
    //   case "Ethereum":
    //     return 50;
    //   case "Arbitrum":
    //     return 30;
    //   case "Zilliqa":
    //     return 20;
    //   case "Neo":
    //     return 20;
    //   default:
    //     return -99;
    // }

    // ! Using object for priority mapping is more efficient
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    return priorityMap[blockchain] ?? -99; // Default to -99 if not found
  };

  // ! sortedBalances get type any here, should be WalletBalance[]
  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // ! lhsPriority is not defined, should be balancePriority
        // if (balancePriority > -99) {
        // if (balance.amount <= 0) {
        // return true;
        // }
        // }
        // return false;

        // ! I think the condition here should be balancePriority > -99 and balance.amount > 0
        return balancePriority > -99 && balance.amount > 0;
        // ! Or if the condition is totally correct, we can simplify it to:
        // return balancePriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }

        // ! Missing comparison for equal priorities, should compare amounts
        return 0;
      });

    // ! don't need to add prices here, as a dependency of useMemo
    // ! since prices are not used in sorting
  }, [balances]);

  // ! two map here is not efficient, we can combine them
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  // ! using formattedBalances instead of sortedBalances
  // const rows = formattedBalances.map(
  //   (balance: FormattedWalletBalance, index: number) => {
  //     const usdValue = prices[balance.currency] * balance.amount;
  //     return (
  //       <WalletRow
  //         className={classes.row}
  //         key={index}
  //         amount={balance.amount}
  //         usdValue={usdValue}
  //         formattedAmount={balance.formatted}
  //       />
  //     );
  //   }
  // );

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const formattedAmount = balance.amount.toFixed(2); // Assuming 2 decimal places for formatting
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
