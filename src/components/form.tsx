"use client";

import * as React from "react";
import {
  FormProvider,
  useFormContext,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "src/components/ui/field";
import { Input } from "src/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "src/components/ui/input-group";
import { cn } from "src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Textarea } from "src/components/ui/textarea";

type FormProps = {
  methods: any;
  onSubmit: (data: any) => void;
  className?: string;
  children: React.ReactNode;
};

const FormContext = React.createContext<any>(null);

export function Form({ methods, onSubmit, className, children }: FormProps) {
  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn("space-y-5", className)}
        >
          {children}
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                             FORM SUBCOMPONENTS                             */
/* -------------------------------------------------------------------------- */

function useFormMethods() {
  const ctx = React.useContext(FormContext);
  if (!ctx) throw new Error("Form.* components must be used inside <Form>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                   INPUT                                    */
/* -------------------------------------------------------------------------- */
type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  autoComplete?: string;
};

Form.Input = function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled,
  className,
  inputClassName,
  autoFocus,
  autoComplete,
}: FormInputProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FieldGroup className={className}>
      <Controller
        control={methods.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {label &&
              (typeof label === "string" ? (
                <FieldLabel className="font-semibold">{label}</FieldLabel>
              ) : (
                label
              ))}
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              {...field}
              className={cn("h-11 placeholder:text-sm", inputClassName)}
            />
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error!]} className="text-xs" />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

/* -------------------------------------------------------------------------- */
/*                                INPUT GROUP                                 */
/* -------------------------------------------------------------------------- */
type FormInputGroupProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  placeholder?: string;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  type?: string;
  autoComplete?: string;
};

Form.InputGroup = function FormInputGroup<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  startAddon,
  endAddon,
  description,
  disabled,
  className,
  inputClassName,
  type,
  autoComplete,
}: FormInputGroupProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FieldGroup className={className}>
      <Controller
        control={methods.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {label &&
              (typeof label === "string" ? (
                <FieldLabel className="font-semibold">{label}</FieldLabel>
              ) : (
                label
              ))}
            <InputGroup className={cn("h-11", className)}>
              {startAddon && (
                <InputGroupAddon>
                  {typeof startAddon === "string" ? (
                    <InputGroupText>{startAddon}</InputGroupText>
                  ) : (
                    startAddon
                  )}
                </InputGroupAddon>
              )}
              <InputGroupInput
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                aria-invalid={fieldState.invalid}
                {...field}
                className={cn("placeholder:text-sm", inputClassName)}
              />
              {endAddon && (
                <InputGroupAddon align="inline-end">
                  {typeof endAddon === "string" ? (
                    <InputGroupText>{endAddon}</InputGroupText>
                  ) : (
                    endAddon
                  )}
                </InputGroupAddon>
              )}
            </InputGroup>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error!]} className="text-xs" />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

/* -------------------------------------------------------------------------- */
/*                                TEXTAREA                                    */
/* -------------------------------------------------------------------------- */
Form.Textarea = function FormTextarea<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  disabled,
  className,
}: FormInputProps<TFieldValues>) {
  const { control } = useFormMethods();

  return (
    <FieldGroup className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {label &&
              (typeof label === "string" ? (
                <FieldLabel className="font-semibold">{label}</FieldLabel>
              ) : (
                label
              ))}
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              {...field}
              className={cn("placeholder:text-sm", className)}
            />
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error!]} className="text-xs" />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  SELECT                                    */
/* -------------------------------------------------------------------------- */
type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormSelectProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  description?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
};

Form.Select = function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  description,
  disabled,
  className,
  selectClassName,
}: FormSelectProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FieldGroup className={className}>
      <Controller
        control={methods.control}
        name={name}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel className="font-semibold">{label}</FieldLabel>
            )}
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  "w-full h-11 cursor-pointer",
                  fieldState.invalid && "border-red-500 focus:ring-red-500",
                  selectClassName,
                )}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error!]} className="text-xs" />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
