"use client";

import type React from "react";
import type { FormField as FormFieldType } from "../types/hotel";

interface FormFieldProps {
  field: FormFieldType;
  onChange: (value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onChange }) => {
  return (
    <div className="relative">
      <label className="text-sm max-sm:text-xs  mb-1 absolute max-sm:top-[-12px] sm:top-[-12px] md:top-[-14px] left-4 md:left-6 bg-[#F6F6F6] py-1 max-sm:py-1 px-2 sm:w-[35%] md:w-[36%] w-[58%] text-gray-700 flex items-center gap-1">
        {field.icon}
        {field.label}
      </label>
      {field.type === "date" ? (
        <div className="border rounded-lg p-5 max-sm:p-4 flex items-center justify-between bg-white">
          <span className="font-medium">{field.value}</span>
          {field.icon}
        </div>
      ) : (
        <select
          className="w-full border rounded-lg p-5 max-sm:p-4 appearance-none bg-white"
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
