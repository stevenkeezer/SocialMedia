import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const plans = [
  {
    name: "System Default",
  },
  {
    name: "Light",
  },
  {
    name: "Dark",
  },
];

export default observer(function ThemeSelector() {
  const localTheme = localStorage.getItem("theme").toLocaleLowerCase();
  const defaultTheme = {
    system: plans[0],
    light: plans[1],
    dark: plans[2],
  };

  const { commonStore } = useStore();
  const { setSystemTheme, enableSystemTheme } = commonStore;
  const { setTheme } = useTheme();

  const [selected, setSelected] = useState(
    (enableSystemTheme && plans[0]) || defaultTheme[localTheme]
  );

  useEffect(() => {
    if (selected.name === "Light") {
      setSystemTheme(false);
      setTheme("light");
    } else if (selected.name === "Dark") {
      setSystemTheme(false);
      setTheme("dark");
    } else {
      setSystemTheme(true);
      setTheme("system");
    }
  }, [selected]);

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer border rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          ></RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
});

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
