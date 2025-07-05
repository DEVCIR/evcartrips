"use client";

import type React from "react";
import type { FormField as FormFieldType } from "../types/hotel";

interface FormFieldProps {
  field: FormFieldType;
  onChange: (value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onChange }) => {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block flex items-center">
        {field.icon}
        {field.label}
      </label>
      {field.type === "date" ? (
        <div className="border rounded-lg p-3 flex items-center justify-between bg-white">
          <span className="font-medium">{field.value}</span>
          {field.icon}
        </div>
      ) : (
        <select
          className="w-full border rounded-lg p-3 appearance-none bg-white"
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
