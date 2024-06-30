import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CustomSelectProps = {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectionChange: (value: string) => void;
};

export function CustomSelect({
  label,
  options,
  selectedOption,
  onSelectionChange,
}: CustomSelectProps) {
  return (
    <div className='relative flex flex-col gap-2'>
      <label className='font-semibold'>{label}</label>
      <Select value={selectedOption} onValueChange={onSelectionChange}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((data) => (
              <SelectItem key={data} className='uppercase' value={data}>
                {data}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
