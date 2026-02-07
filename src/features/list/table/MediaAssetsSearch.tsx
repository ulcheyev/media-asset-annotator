type MediaAssetsSearchProps = {
    value: string;
    onChange: (value: string) => void;
};

export const MediaAssetsSearch = ({ value, onChange }: MediaAssetsSearchProps) => (
    <input
        placeholder="Search assets by any field, or use `field=value` syntax"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
      w-full max-w-sm rounded-md border border-gray-300
      bg-white px-3 py-2 text-sm shadow-sm
      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
    "
    />
);
